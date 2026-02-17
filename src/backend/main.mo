import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Set "mo:core/Set";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Add migration with-clause for safe persistent updates

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Status = {
    #scouting;
    #missionCritical;
    #tacticalDrills;
    #victoryZone;
  };

  type SyllabusItem = {
    id : Text;
    chapter : Text;
    topic : Text;
    description : Text;
    tasks : [Text];
    status : Status;
    isCompleted : Bool;
  };

  module SyllabusItem {
    public func compare(a : SyllabusItem, b : SyllabusItem) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  type ChapterReward = {
    coins : Nat;
    xp : Nat;
  };

  // Internal representation with persistent Set usage for completedChapters
  type GamificationState = {
    xp : Nat;
    coins : Nat;
    dailyStreak : Nat;
    lastActivity : Time.Time;
    completedChapters : Set.Set<Text>;
  };

  // Public-facing immutable view
  public type GamificationStateView = {
    xp : Nat;
    coins : Nat;
    dailyStreak : Nat;
    lastActivity : Time.Time;
    completedChapters : [Text];
  };

  module GamificationState {
    public func compareByXp(a : (Principal, GamificationState), b : (Principal, GamificationState)) : Order.Order {
      Nat.compare(b.1.xp, a.1.xp); // Descending order
    };
  };

  public type UserProfile = {
    name : Text;
  };

  let syllabusItemsMap = Map.empty<Text, SyllabusItem>();
  let gamificationMap = Map.empty<Principal, GamificationState>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let chapterRewards = Map.empty<Text, ChapterReward>();

  // Converts internal GamificationState to its public immutable [Text] representation
  func toView(state : GamificationState) : GamificationStateView {
    { state with completedChapters = state.completedChapters.toArray() };
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Syllabus Management (Admin-only)
  public shared ({ caller }) func createSyllabusItem(chapter : Text, topic : Text, description : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create syllabus items");
    };

    let id = chapter # "-" # topic;
    let newItem : SyllabusItem = {
      id;
      chapter;
      topic;
      description;
      tasks = [];
      status = #scouting;
      isCompleted = false;
    };

    syllabusItemsMap.add(id, newItem);
    id;
  };

  public shared ({ caller }) func addTaskToSyllabusItem(id : Text, task : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add tasks to syllabus items");
    };

    switch (syllabusItemsMap.get(id)) {
      case (null) { Runtime.trap("Syllabus item not found") };
      case (?item) {
        let updatedTasks = item.tasks.concat([task]);
        let updatedItem = {
          id = item.id;
          chapter = item.chapter;
          topic = item.topic;
          description = item.description;
          tasks = updatedTasks;
          status = item.status;
          isCompleted = item.isCompleted;
        };
        syllabusItemsMap.add(id, updatedItem);
      };
    };
  };

  public shared ({ caller }) func updateTaskStatus(id : Text, _taskIndex : Nat, newStatus : Status) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update task status");
    };

    switch (syllabusItemsMap.get(id)) {
      case (null) { Runtime.trap("Syllabus item not found") };
      case (?item) {
        let updatedItem = {
          id = item.id;
          chapter = item.chapter;
          topic = item.topic;
          description = item.description;
          tasks = item.tasks;
          status = newStatus;
          isCompleted = (newStatus == #victoryZone);
        };
        syllabusItemsMap.add(id, updatedItem);
      };
    };
  };

  // Syllabus Queries (User-level access)
  public query ({ caller }) func getSyllabusItem(id : Text) : async SyllabusItem {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view syllabus items");
    };

    switch (syllabusItemsMap.get(id)) {
      case (null) { Runtime.trap("Syllabus item not found") };
      case (?item) { item };
    };
  };

  public query ({ caller }) func getAllSyllabusItems() : async [SyllabusItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view syllabus items");
    };

    syllabusItemsMap.values().toArray().sort();
  };

  // Initialize Chapter Rewards (Admin only)
  public shared ({ caller }) func initializeChapterRewards(chapters : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can initialize chapter rewards");
    };

    for (chapter in chapters.values()) {
      let reward : ChapterReward = {
        coins = 50;
        xp = 500;
      };
      chapterRewards.add(chapter, reward);
    };
  };

  // Helper function to verify chapter completion eligibility
  func verifyChapterEligibility(chapter : Text) : Bool {
    let chapterItems = syllabusItemsMap.values().toArray().filter(func(item : SyllabusItem) : Bool {
      item.chapter == chapter
    });

    if (chapterItems.size() == 0) {
      return false;
    };

    for (item in chapterItems.values()) {
      if (not item.isCompleted) {
        return false;
      };
    };

    true;
  };

  // Boss Fight Completion (User-level, own progress only)
  public shared ({ caller }) func completeBossFight(_earnedXp : Nat, chapter : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can complete boss fights");
    };

    // Verify the chapter exists in rewards
    switch (chapterRewards.get(chapter)) {
      case (null) { Runtime.trap("Chapter not found") };
      case (?_reward) {};
    };

    // Verify all syllabus items in the chapter are completed
    if (not verifyChapterEligibility(chapter)) {
      Runtime.trap("Unauthorized: All chapter syllabus items must be completed before claiming boss fight rewards");
    };

    let currentTime = Time.now();

    let oldState = switch (gamificationMap.get(caller)) {
      case (null) {
        {
          xp = 0;
          coins = 0;
          dailyStreak = 0;
          lastActivity = currentTime;
          completedChapters = Set.empty<Text>();
        };
      };
      case (?state) { state };
    };

    // Check if chapter already completed by this user
    if (oldState.completedChapters.contains(chapter)) {
      Runtime.trap("Unauthorized: You have already completed this chapter");
    };

    let chapterReward = switch (chapterRewards.get(chapter)) {
      case (null) { Runtime.trap("Chapter not found") };
      case (?reward) { reward };
    };

    // Update completed chapters
    oldState.completedChapters.add(chapter);

    let isNewDay = currentTime / (24 * 3600 * 1_000_000_000) > oldState.lastActivity / (24 * 3600 * 1_000_000_000);

    let newStreak = if (isNewDay) {
      if (currentTime / (24 * 3600 * 1_000_000_000) == oldState.lastActivity / (24 * 3600 * 1_000_000_000) + 1) {
        oldState.dailyStreak + 1;
      } else { 1 };
    } else { oldState.dailyStreak };

    let newState = {
      xp = oldState.xp + chapterReward.xp;
      coins = oldState.coins + chapterReward.coins;
      dailyStreak = newStreak;
      lastActivity = currentTime;
      completedChapters = oldState.completedChapters;
    };

    gamificationMap.add(caller, newState);
  };

  // Leaderboard (User-level access) - Returns immutable view types
  public query ({ caller }) func getLeaderBoard(_limit : Nat) : async [(Principal, GamificationStateView)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view the leaderboard");
    };

    gamificationMap.toArray().sort(GamificationState.compareByXp).map(
      func((principal, state)) { (principal, toView(state)) }
    );
  };

  // Gamification State Query (with ownership check)
  public query ({ caller }) func getGamificationState(user : Principal) : async ?GamificationStateView {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view gamification state");
    };

    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own gamification state");
    };

    switch (gamificationMap.get(user)) {
      case (null) { null };
      case (?state) { ?toView(state) };
    };
  };

  // All Gamification States (Admin-only) - Returns immutable view types
  public query ({ caller }) func getAllGamificationStates() : async [(Principal, GamificationStateView)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all gamification states");
    };

    gamificationMap.toArray().map(
      func((principal, state)) { (principal, toView(state)) }
    );
  };
};

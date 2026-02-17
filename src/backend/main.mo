import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";

actor {
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

  let syllabusItemsMap = Map.empty<Text, SyllabusItem>();

  public shared ({ caller }) func createSyllabusItem(chapter : Text, topic : Text, description : Text) : async Text {
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

  public shared ({ caller }) func updateTaskStatus(id : Text, taskIndex : Nat, newStatus : Status) : async () {
    switch (syllabusItemsMap.get(id)) {
      case (null) { Runtime.trap("Syllabus item not found") };
      case (?item) {
        if (taskIndex >= item.tasks.size()) { Runtime.trap("Task index out of bounds") };

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

  public query ({ caller }) func getSyllabusItem(id : Text) : async SyllabusItem {
    switch (syllabusItemsMap.get(id)) {
      case (null) { Runtime.trap("Syllabus item not found") };
      case (?item) { item };
    };
  };

  public query ({ caller }) func getAllSyllabusItems() : async [SyllabusItem] {
    syllabusItemsMap.values().toArray().sort(); // Default compare uses SyllabusItem.compare() implicitly
  };
};

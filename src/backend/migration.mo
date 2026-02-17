import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";

module {
  type OldGamificationState = {
    xp : Nat;
    dailyStreak : Nat;
    lastActivity : Time.Time;
  };

  type OldActor = {
    gamificationMap : Map.Map<Principal, OldGamificationState>;
  };

  type NewGamificationState = {
    xp : Nat;
    coins : Nat;
    dailyStreak : Nat;
    lastActivity : Time.Time;
    completedChapters : Set.Set<Text>;
  };

  type NewActor = {
    gamificationMap : Map.Map<Principal, NewGamificationState>;
  };

  public func run(old : OldActor) : NewActor {
    let newGamificationMap = old.gamificationMap.map<Principal, OldGamificationState, NewGamificationState>(
      func(_p, oldState) {
        {
          xp = oldState.xp;
          coins = 0;
          dailyStreak = oldState.dailyStreak;
          lastActivity = oldState.lastActivity;
          completedChapters = Set.empty<Text>();
        };
      }
    );
    { gamificationMap = newGamificationMap };
  };
};

import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GamificationStateView {
    xp: bigint;
    completedChapters: Array<string>;
    lastActivity: Time;
    coins: bigint;
    dailyStreak: bigint;
}
export type Time = bigint;
export interface SyllabusItem {
    id: string;
    status: Status;
    tasks: Array<string>;
    topic: string;
    isCompleted: boolean;
    description: string;
    chapter: string;
}
export interface UserProfile {
    name: string;
}
export enum Status {
    tacticalDrills = "tacticalDrills",
    victoryZone = "victoryZone",
    missionCritical = "missionCritical",
    scouting = "scouting"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addTaskToSyllabusItem(id: string, task: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    completeBossFight(_earnedXp: bigint, chapter: string): Promise<void>;
    createSyllabusItem(chapter: string, topic: string, description: string): Promise<string>;
    getAllGamificationStates(): Promise<Array<[Principal, GamificationStateView]>>;
    getAllSyllabusItems(): Promise<Array<SyllabusItem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGamificationState(user: Principal): Promise<GamificationStateView | null>;
    getLeaderBoard(_limit: bigint): Promise<Array<[Principal, GamificationStateView]>>;
    getSyllabusItem(id: string): Promise<SyllabusItem>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeChapterRewards(chapters: Array<string>): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateTaskStatus(id: string, _taskIndex: bigint, newStatus: Status): Promise<void>;
}

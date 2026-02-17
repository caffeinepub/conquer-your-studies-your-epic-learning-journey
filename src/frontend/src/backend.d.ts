import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SyllabusItem {
    id: string;
    status: Status;
    tasks: Array<string>;
    topic: string;
    isCompleted: boolean;
    description: string;
    chapter: string;
}
export enum Status {
    tacticalDrills = "tacticalDrills",
    victoryZone = "victoryZone",
    missionCritical = "missionCritical",
    scouting = "scouting"
}
export interface backendInterface {
    addTaskToSyllabusItem(id: string, task: string): Promise<void>;
    createSyllabusItem(chapter: string, topic: string, description: string): Promise<string>;
    getAllSyllabusItems(): Promise<Array<SyllabusItem>>;
    getSyllabusItem(id: string): Promise<SyllabusItem>;
    updateTaskStatus(id: string, taskIndex: bigint, newStatus: Status): Promise<void>;
}

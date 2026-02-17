import { Status } from '../backend';

export interface StatusTheme {
  label: string;
  colorClass: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

export const statusThemeMap: Record<Status, StatusTheme> = {
  [Status.missionCritical]: {
    label: 'Mission Critical',
    colorClass: 'mission-critical',
    bgClass: 'bg-mission-critical',
    textClass: 'text-mission-critical-foreground',
    borderClass: 'border-mission-critical'
  },
  [Status.tacticalDrills]: {
    label: 'Tactical Drills',
    colorClass: 'tactical-drills',
    bgClass: 'bg-tactical-drills',
    textClass: 'text-tactical-drills-foreground',
    borderClass: 'border-tactical-drills'
  },
  [Status.victoryZone]: {
    label: 'Victory Zone',
    colorClass: 'victory-zone',
    bgClass: 'bg-victory-zone',
    textClass: 'text-victory-zone-foreground',
    borderClass: 'border-victory-zone'
  },
  [Status.scouting]: {
    label: 'Scouting',
    colorClass: 'scouting',
    bgClass: 'bg-scouting',
    textClass: 'text-scouting-foreground',
    borderClass: 'border-scouting'
  }
};

export function getStatusTheme(status: Status): StatusTheme {
  return statusThemeMap[status];
}

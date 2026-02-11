export enum UIState {
  INITIAL = 'INITIAL',
  REPORTING = 'REPORTING',
  TRACKING = 'TRACKING'
}

export interface AppConfig {
  visionEnabled: boolean;
  transparency: number;
}

export enum BuildingType {
  TRX = 'TRX',
  TWIN_TOWERS = 'TWIN_TOWERS',
  MENARA_KL = 'MENARA_KL',
  WARISAN_MERDEKA = 'WARISAN_MERDEKA'
}

export interface BuildingProps {
  type: BuildingType;
  delay: number;
}

export enum Page {
  LANDING = 'landing',
  LOGIN = 'login',
  DASHBOARD = 'dashboard'
}

export enum Tab {
  MAP = 'map',
  ACTIVITIES = 'activities',
  SETTINGS = 'settings'
}

export interface NearbyIssue {
  id: string;
  title: string;
  status: 'Fixed' | 'Pending' | 'In Progress';
  distance: string;
  color: string;
  date?: string;
}

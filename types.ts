
export enum UIState {
  INITIAL = 'INITIAL',
  REPORTING = 'REPORTING',
  TRACKING = 'TRACKING'
}

export interface AppConfig {
  visionEnabled: boolean;
  transparency: number;
}

// User role types
export type UserRole = 'citizen' | 'officer';

export enum Role {
  CITIZEN = 'citizen',
  OFFICER = 'officer'
}

// Added Page enum to resolve module error in App.tsx
export enum Page {
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  INCLUSIVE_MODE = 'INCLUSIVE_MODE',
  HOME = 'HOME',
  REPORT = 'REPORT',
  OFFICER_DASHBOARD = 'officer'
}

// Added Tab enum to resolve module error in App.tsx
export enum Tab {
  MAP = 'MAP',
  ACTIVITIES = 'ACTIVITIES',
  SETTINGS = 'SETTINGS'
}

// Added NearbyIssue interface to resolve module error in App.tsx
export interface NearbyIssue {
  id: string;
  title: string;
  status: string;
  distance: string;
  color: string;
  date: string;
}

// Added BuildingType and BuildingProps to resolve module errors in components/BuildingSilhouette.tsx
/**
 * Defines the specific architectural landmarks used for the background visualization.
 */
export enum BuildingType {
  TRX = 'trx',
  TWIN_TOWERS = 'twin_towers',
  MENARA_KL = 'menara_kl',
  WARISAN_MERDEKA = 'warisan_merdeka'
}

/**
 * Props for the BuildingSilhouette component.
 */
export interface BuildingProps {
  type: BuildingType;
  delay: number;
}

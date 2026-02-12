export enum UIState {
  INITIAL = 'INITIAL',
  REPORTING = 'REPORTING',
  TRACKING = 'TRACKING'
}

export interface AppConfig {
  visionEnabled: boolean;
  transparency: number;
}

// Added BuildingType and BuildingProps to resolve module errors in components/BuildingSilhouette.tsx
/**
 * Defines the specific architectural landmarks used for the background visualization.
 */
export enum BuildingType {
  TRX = 'TRX',
  TWIN_TOWERS = 'TWIN_TOWERS',
  MENARA_KL = 'MENARA_KL',
  WARISAN_MERDEKA = 'WARISAN_MERDEKA'
}

/**
 * Props for the BuildingSilhouette component.
 */
export interface BuildingProps {
  type: BuildingType;
  delay: number;
}

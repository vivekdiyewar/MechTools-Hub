export interface HistoryEntry {
  id: string;
  type:
    | "Stress"
    | "Strain"
    | "Power"
    | "Torque"
    | "BeamDeflection"
    | "FluidPressure"
    | "ThermalExpansion"
    | "KineticEnergy"
    | "ReynoldsNumber"
    | "GearRatio";
  inputs: Record<string, string>;
  result: number;
  unit: string;
  timestamp: number;
}

export interface AuthUser {
  username: string;
}

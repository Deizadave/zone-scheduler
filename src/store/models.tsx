export interface Zone {
    id: number;
    name: string;
}
  
export interface Schedule {
    id: number;
    zoneId: number;
    zone: string;
    temperature: number;
    unit: "°C" | "°F";
    time: string;
}
  
export interface IAppState {
    zones: Zone[];
    schedules: Schedule[];
    unit: "°C" | "°F";
    display: "list" | "grid";
}
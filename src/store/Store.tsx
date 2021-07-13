import { createContext, useReducer } from "react";

export interface Zone {
  id: number;
  name: string;
  schedules?: number;
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

const initialState: IAppState = {
  zones: [],
  schedules: [],
  unit: "°C",
  display: "list"
}

let AppContext: any = createContext(initialState);

enum Actions {
  ZONES_Set = "[ZONE] Set",
  SCHEDULE_Add = "[SCHEDULE] Add",
  SCHEDULE_Remove = "[SCHEDULE] Remove",
  SCHEDULE_Update = "[SCHEDULE] Update",
  UNIT_Toggle = '[UNIT] Toggle',
  DISPLAY_Set = '[DISPLAY] Set'
}

const reducer = (state: IAppState, action: any) => {
  switch(action.type) {
    case Actions.ZONES_Set: {
      return { ...state, zones: action.payload }
    }
    case Actions.SCHEDULE_Add: {
      const updatedSchedules = [...state.schedules, ...action.payload];
      updatedSchedules.sort((a: Schedule, b: Schedule) => new Date(b.time).getTime() - new Date(a.time).getTime());      
      return { ...state, schedules: updatedSchedules }
    }
    case Actions.SCHEDULE_Remove: {
      return { ...state, schedules: [...state.schedules.filter((schedule: Schedule) => schedule.id !== action.payload)] }
    }
    case Actions.SCHEDULE_Update: {
      let updatedIndex = state.schedules.findIndex((schedule: Schedule) => schedule.id === action.payload.id);
      state.schedules[updatedIndex] = action.payload;      
      return { ...state, schedules: [...state.schedules] }
    }
    case Actions.UNIT_Toggle: {
      return { ...state, unit: action.payload }
    }
    case Actions.DISPLAY_Set: {
      return { ...state, display: action.payload }
    }
  }
  return state;
};


const AppContextProvider = (props: any) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = { state, dispatch };
  
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer, Actions };
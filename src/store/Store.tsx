import { createContext, useReducer } from "react";

export interface Zone {
  id: number;
  name: string;
  schedules?: number;
}

export interface Schedule {
  id: string;
  zone: string;
  temperature: string;
  time: string;
}

export interface IAppState {
  zones: Zone[];
  schedules: Schedule[];
  unit: string;
  display: string;
}

const initialState: IAppState = {
  zones: [],
  schedules: [],
  unit: "C",
  display: "list"
}

let AppContext: any = createContext(initialState);

enum Actions {
  SCHEDULE_Add = "[SCHEDULE] Add",
  SCHEDULE_Remove = "[SCHEDULE] Remove",
  TEMP_Set = '[TEMP] Set',
  DISPLAY_Set = '[DISPLAY] Set'
}

let reducer = (state: any, action: any) => {
  switch(action.type) {
    case Actions.SCHEDULE_Add: {
      return { ...state, schedules: [...state.schedules, action.schedule] }
    }
    case Actions.SCHEDULE_Remove: {
      return { ...state, schedules: [...state.schedules.filter((schedule: Schedule) => schedule.id !== action.id)] }
    }
    case Actions.TEMP_Set: {
      return { ...state, unit: action.unit }
    }
    case Actions.DISPLAY_Set: {
      return { ...state, display: action.display }
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
import { Actions } from "./actions";
import { IAppState, Schedule } from "./models";


const reducers = (state: IAppState, action: any) => {
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

export default reducers;
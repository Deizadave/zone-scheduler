import { createContext, useReducer } from "react";
import { IAppState } from './models';
import reducers from "./reducers";


const initialState: IAppState = {
  zones: [],
  schedules: [],
  unit: "°C",
  display: "list"
}

let AppContext: any = createContext(initialState);

const AppContextProvider = (props: any) => {
  let [state, dispatch] = useReducer(reducers, initialState);
  let value = { state, dispatch };
  
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
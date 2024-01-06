/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { DTRP_State, ActionNames, Actions } from "../constants/DTRP_types";
// import {
//     type MRT_Column
// } from 'mantine-react-table'

const DefaultDTRP_State: DTRP_State = {
  startDate: undefined,
  endDate: undefined,
  selectedShortcut: undefined,
};

export const DTRPContext = createContext<{
  state: DTRP_State;
  dispatch: Dispatch<Actions>;
} | null>(null);

const DTRP_Reducer = (state: DTRP_State, actions: Actions): DTRP_State => {
  const { type, payload } = actions as Actions;

  switch (type) {
    case ActionNames.SELECT_SHORTCUT:
      return { ...state, selectedShortcut: payload };
    case ActionNames.SET_START_DATE:
      return { ...state, startDate: payload };
    case ActionNames.SET_END_DATE:
      return { ...state, endDate: payload };
    case ActionNames.RESET:
      return { ...DefaultDTRP_State };
    default:
      return state;
  }
};

type contextProps = {
  children: ReactNode;
};

export default function DTRP_ContextProvider({ children }: contextProps) {
  const [state, dispatch] = useReducer(DTRP_Reducer, DefaultDTRP_State);

  return (
    <DTRPContext.Provider value={{ state, dispatch }}>
      {children}
    </DTRPContext.Provider>
  );
}

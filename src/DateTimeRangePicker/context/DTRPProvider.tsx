import { createContext, useReducer, ReactNode, Dispatch } from "react";
// import {
//     type MRT_Column
// } from 'mantine-react-table'

export type Shortcuts = "hours" | "weeks" | "months" | "years" | undefined;

type DTRP_State = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  isOpen: boolean;
  selectedShortcut: Shortcuts;
};

const DefaultDTRP_State: DTRP_State = {
  startDate: undefined,
  endDate: undefined,
  selectedShortcut: undefined,
  isOpen: false,
};

export enum ActionNames {
  OPEN_CLOSE,
  CLOSE,
  SELECT_SHORTCUT,
  SET_START_DATE,
  SET_END_DATE,
  RESET,
}

// type exampleFuncType = (paramOne: string, paramTwo: number) => [string, number]

type Actions =
  | { type: ActionNames.SELECT_SHORTCUT; payload: Shortcuts }
  | { type: ActionNames.OPEN_CLOSE; payload: null }
  | { type: ActionNames.CLOSE; payload: null }
  | { type: ActionNames.SET_START_DATE; payload: Date | undefined }
  | { type: ActionNames.SET_END_DATE; payload: Date | undefined }
  | { type: ActionNames.RESET; payload: null };

export const DTRPContext = createContext<{
  state: DTRP_State;
  dispatch: Dispatch<Actions>;
} | null>(null);

const DTRP_Reducer = (state: DTRP_State, actions: Actions): DTRP_State => {
  const { type, payload } = actions as Actions;

  switch (type) {
    case ActionNames.OPEN_CLOSE:
      return { ...state, isOpen: !state.isOpen };
    case ActionNames.CLOSE:
      return { ...state, isOpen: false };
    case ActionNames.SELECT_SHORTCUT:
      return { ...state, selectedShortcut: payload };
    case ActionNames.SET_START_DATE:
      return { ...state, startDate: payload };
    case ActionNames.SET_END_DATE:
      return { ...state, endDate: payload };
    case ActionNames.RESET:
      return { ...DefaultDTRP_State, isOpen: true };
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

export type Shortcuts = "hours" | "weeks" | "months" | "years" | undefined;

export type DTRP_State = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  isOpen: boolean;
  selectedShortcut: Shortcuts;
};

export enum ActionNames {
  OPEN_CLOSE,
  CLOSE,
  SELECT_SHORTCUT,
  SET_START_DATE,
  SET_END_DATE,
  RESET,
}

export type Actions =
  | { type: ActionNames.SELECT_SHORTCUT; payload: Shortcuts }
  | { type: ActionNames.OPEN_CLOSE; payload: null }
  | { type: ActionNames.CLOSE; payload: null }
  | { type: ActionNames.SET_START_DATE; payload: Date | undefined }
  | { type: ActionNames.SET_END_DATE; payload: Date | undefined }
  | { type: ActionNames.RESET; payload: null };

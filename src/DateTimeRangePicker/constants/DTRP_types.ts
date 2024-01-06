export type Shortcuts = "hours" | "weeks" | "months" | "years" | undefined;

export type DTRP_State = {
  DateTimeRange: [Date | undefined, Date | undefined];
  Shortcut: Shortcuts;
};

export enum ActionNames {
  SELECT_SHORTCUT,
  SET_START_DATE,
  SET_END_DATE,
  RESET,
}

export type Actions =
  | { type: ActionNames.SELECT_SHORTCUT; payload: Shortcuts }
  | { type: ActionNames.SET_START_DATE; payload: Date | undefined }
  | { type: ActionNames.SET_END_DATE; payload: Date | undefined }
  | { type: ActionNames.RESET; payload: null };

/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useState } from "react";
import { DTRP_State, Shortcuts } from "../constants/DTRP_types";
import { sub } from "date-fns";

const DefaultDTRP_State: DTRP_State = {
  DateTimeRange: [undefined, undefined],
  Shortcut: undefined,
};

export const DTRPContext = createContext<{
  DTRP_State: DTRP_State;
  setDateTimeRange: (date: Date) => void;
  setShortcut: (shortcut: Shortcuts) => void;
  reset: () => void;
  SetDTRP_State: React.Dispatch<React.SetStateAction<DTRP_State>>;
} | null>(null);

type contextProps = {
  children: ReactNode;
};

export default function DTRP_ContextProvider({ children }: contextProps) {
  const [DTRP_State, SetDTRP_State] = useState<DTRP_State>(DefaultDTRP_State);

  const setDateTimeRange = (date: Date): void => {
    if (
      !DTRP_State.DateTimeRange[0] ||
      (DTRP_State.DateTimeRange[0] && DTRP_State.DateTimeRange[1])
    ) {
      SetDTRP_State((prev) => {
        return { ...prev, DateTimeRange: [date, undefined] };
      });

      return;
    }

    if (!DTRP_State.DateTimeRange[1]) {
      SetDTRP_State((prev) => {
        const newArray = [...prev.DateTimeRange];
        return { ...prev, DateTimeRange: [newArray[0], date] };
      });

      return;
    }
  };

  const setShortcut = (shortcut: Shortcuts): void => {
    if (shortcut) {
      const shortcutDateRange: [Date, Date] = [
        sub(new Date(), {
          [shortcut as string]: shortcut === "hours" ? 24 : 1,
        }),
        new Date(),
      ];

      SetDTRP_State({ Shortcut: shortcut, DateTimeRange: shortcutDateRange });
    }
  };

  const reset = (): void => {
    SetDTRP_State(DefaultDTRP_State);
  };

  return (
    <DTRPContext.Provider
      value={{
        DTRP_State,
        setDateTimeRange,
        setShortcut,
        reset,
        SetDTRP_State,
      }}
    >
      {children}
    </DTRPContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useState } from "react";
import { DTRP_State, Shortcuts } from "../constants/DTRP_types";
import { setHours, setMinutes, sub } from "date-fns";

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
  setTime: ({
    isStartTime,
    selectedHour,
    setlectedMinute,
  }: {
    isStartTime: boolean;
    selectedHour: number;
    setlectedMinute: number;
  }) => void;
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

  const setTime = ({
    isStartTime,
    selectedHour,
    setlectedMinute,
  }: {
    isStartTime: boolean;
    selectedHour: number;
    setlectedMinute: number;
  }): void => {
    const newArray: [Date | undefined, Date | undefined] = [
      ...DTRP_State.DateTimeRange,
    ];
    if (DTRP_State.DateTimeRange[0] && isStartTime) {
      const newDateWithTime: Date = setMinutes(
        setHours(newArray[0] as Date, selectedHour),
        setlectedMinute
      );
      newArray[0] = newDateWithTime;
      SetDTRP_State((prev) => {
        return { ...prev, DateTimeRange: newArray };
      });

      return;
    }

    if (DTRP_State.DateTimeRange[0]) {
      const newDateWithTime: Date = setMinutes(
        setHours(newArray[1] as Date, selectedHour),
        setlectedMinute
      );
      newArray[1] = newDateWithTime;

      SetDTRP_State((prev) => {
        return { ...prev, DateTimeRange: newArray };
      });

      return;
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
        setTime,
        SetDTRP_State,
      }}
    >
      {children}
    </DTRPContext.Provider>
  );
}

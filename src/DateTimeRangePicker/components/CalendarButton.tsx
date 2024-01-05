import CalendarIcon from "./../../assets/calendar.png";
import { ActionNames } from "../constants/DTRP_types";
import { useDTRP } from "../hooks/useDTRP";

import { format } from "date-fns";
// import { useMemo } from "react";

export default function CalendarButton() {
  const { dispatch, state } = useDTRP();
  const { endDate, startDate } = state;

  const handleOpenCloseCalendar = () => {
    dispatch({ type: ActionNames.OPEN_CLOSE, payload: null });
  };

  return (
    <div className="flex gap-2">
      <div className="flex flex-col justify-around items-end">
        <span className="text-sm text-gray-700">start:</span>
        <span className="text-sm text-gray-700">end:</span>
      </div>
      <button
        onClick={handleOpenCloseCalendar}
        className="flex bg-gray-50 border rounded-md px-2 py-1 gap-3 shadow-sm hover:bg-gray-100 active:bg-gray-50 items-center w-64 text-sm"
      >
        <div className="grow flex flex-col gap-1">
          {startDate
            ? format(startDate, "MMMM d, yyyy h:mm a")
            : "-- / -- / -- --:--"}
          <hr />

          {endDate
            ? format(endDate, "MMMM d, yyyy h:mm a")
            : "-- / -- / -- --:--"}
        </div>
        <img src={CalendarIcon} className="w-5" />
      </button>
    </div>
  );
}

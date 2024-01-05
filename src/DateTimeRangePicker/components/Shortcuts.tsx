import { type Shortcuts, ActionNames } from "../constants/DTRP_types";
import { sub } from "date-fns";
import TimeSelector from "./TimeSelector";
import { useDTRP } from "../hooks/useDTRP";

export default function Shortcuts() {
  const { state, dispatch } = useDTRP();
  const handleSelectShortcut = (shortcut: Shortcuts) => {
    if (shortcut) {
      const selectedDateRange: [Date, Date] = [
        sub(new Date(), {
          [shortcut as string]: shortcut === "hours" ? 24 : 1,
        }),
        new Date(),
      ];

      dispatch({ type: ActionNames.SELECT_SHORTCUT, payload: shortcut });
      dispatch({
        type: ActionNames.SET_START_DATE,
        payload: selectedDateRange[0],
      });
      dispatch({
        type: ActionNames.SET_END_DATE,
        payload: selectedDateRange[1],
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-start w-28 pr-2 border-r select-none  text-sm">
      <button
        onClick={() => handleSelectShortcut("hours")}
        className={`rounded-sm p-1 text-start  text-gray-800 ${
          state.selectedShortcut === "hours" ? "text-green-500" : ""
        }`}
      >
        today
      </button>
      <button
        onClick={() => handleSelectShortcut("hours")}
        className={`rounded-sm p-1 text-start  text-gray-800 ${
          state.selectedShortcut === "hours" ? "text-green-500" : ""
        }`}
      >
        last 24h
      </button>
      <button
        onClick={() => handleSelectShortcut("weeks")}
        className={`rounded-sm  p-1 text-start  text-gray-800 ${
          state.selectedShortcut === "weeks" ? "text-green-500" : ""
        }`}
      >
        this week
      </button>
      <button
        onClick={() => handleSelectShortcut("weeks")}
        className={`rounded-sm  p-1 text-start  text-gray-800 ${
          state.selectedShortcut === "weeks" ? "text-green-500" : ""
        }`}
      >
        last week
      </button>
      <button
        onClick={() => handleSelectShortcut("months")}
        className={`rounded-sm  p-1 text-start  text-gray-800 ${
          state.selectedShortcut === "months" ? "text-green-500" : ""
        }`}
      >
        this month
      </button>
      <button
        onClick={() => handleSelectShortcut("months")}
        className={`rounded-sm  p-1 text-start  text-gray-800 ${
          state.selectedShortcut === "months" ? "text-green-500" : ""
        }`}
      >
        last month
      </button>
      {/* <button
        onClick={() => handleSelectShortcut("years")}
        className={`rounded-sm  p-1 text-start  text-gray-800 ${
          state.selectedShortcut === "years" ? "text-green-500" : ""
        }`}
      >
        this year
      </button>
      <button
        onClick={() => handleSelectShortcut("years")}
        className={`rounded-sm  p-1 text-start  text-gray-800 ${
          state.selectedShortcut === "years" ? "text-green-500" : ""
        }`}
      >
        last year
      </button> */}
      <hr />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-start  ">
          <span className="text-gray-700 text-sm w-10">start: </span>
          <TimeSelector isStartTime={true} />
        </div>
        <div className="flex flex-col items-start justify-start">
          <span className="text-gray-700 text-sm w-10">end: </span>
          <TimeSelector isStartTime={false} />
        </div>
      </div>
    </div>
  );
}

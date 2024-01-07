import { type Shortcuts } from "../constants/DTRP_types";
import TimeSelector from "./TimeSelector";
import { useDTRP } from "../hooks/useDTRP";

export default function Shortcuts() {
  const { setShortcut, DTRP_State } = useDTRP();

  return (
    <div className="flex flex-col gap-2 justify-start w-28 pr-2 border-r select-none  text-sm">
      <button
        onClick={() => setShortcut("hours")}
        className={`rounded-sm p-1 text-start  text-gray-800 ${
          DTRP_State.Shortcut === "hours" ? "text-green-500" : ""
        }`}
      >
        today
      </button>
      <button
        onClick={() => setShortcut("weeks")}
        className={`rounded-sm  p-1 text-start  text-gray-800 ${
          DTRP_State.Shortcut === "weeks" ? "text-green-500" : ""
        }`}
      >
        this week
      </button>
      <button
        onClick={() => setShortcut("months")}
        className={`rounded-sm  p-1 text-start  text-gray-800 ${
          DTRP_State.Shortcut === "months" ? "text-green-500" : ""
        }`}
      >
        this month
      </button>
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

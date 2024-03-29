import { useDTRP } from "../hooks/useDTRP";

export default function CalendarFooter({ close }: { close: () => void }) {
  const { reset } = useDTRP();

  return (
    <div className="flex justify-between item gap-3 pt-3 select-none border-t">
      <button
        onClick={reset}
        className="rounded-md px-3 py-1 border text-gray-700  hover:bg-gray-100 active:shadow-none active:bg-gray-200"
      >
        reset
      </button>
      <div className="flex gap-2">
        <button
          onClick={() => close()}
          className="text-gray-700  px-3 py-1 rounded-md hover:bg-gray-100 "
        >
          cancel
        </button>
        <button
          onClick={() => close()}
          className="rounded-md px-3 py-1 shadow bg-green-600 text-white hover:bg-green-700 active:shadow-none active:bg-green-600"
        >
          submit
        </button>
      </div>
    </div>
  );
}

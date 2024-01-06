import { setHours, setMinutes, format } from "date-fns";
import Clock from "../../assets/clock.png";
import { ReactNode, useMemo, useState } from "react";
import { Popover } from "@headlessui/react";
import { useDTRP } from "../hooks/useDTRP";

import { ActionNames } from "../constants/DTRP_types";

export default function TimeSelector({
  isStartTime,
}: {
  isStartTime: boolean;
}) {
  const { state, dispatch } = useDTRP();
  const { endDate, startDate } = state;

  const [selectedHour, setSelectedHour] = useState<number>(1);
  const [setlectedMinute, setSelectedMinute] = useState<number>(1);
  console.log(setlectedMinute);

  const handleSelectHour = (hour: number): void => {
    setSelectedHour(hour);
  };

  const handleSelectMinute = (minute: number): void => {
    setSelectedMinute(minute);
  };

  const handleSubmit = (): void => {
    if (isStartTime && startDate) {
      const newDateWithTime: Date = setMinutes(
        setHours(startDate, selectedHour),
        setlectedMinute
      );
      dispatch({
        type: ActionNames.SET_START_DATE,
        payload: newDateWithTime,
      });
    }

    if (!isStartTime && endDate) {
      const newDateWithTime: Date = setMinutes(
        setHours(endDate, selectedHour),
        setlectedMinute
      );

      dispatch({
        type: ActionNames.SET_END_DATE,
        payload: newDateWithTime,
      });
    }
  };

  return (
    <Popover className="relative grow">
      <Popover.Button className="flex text-sm  w-full gap-2 px-2 justify-betweenbg-gray-50 items-center rounded-md border shadow-sm py-1 hover:bg-gray-100 active:bg-gray-50 active:shadow-none focus:bg-gray-100">
        <span className="grow">
          {format(startDate ? startDate : new Date(), "hh : mm")}
        </span>
        <img src={Clock} alt="clock-icon" className="w-4" />
      </Popover.Button>
      <Popover.Panel>
        {({ close }) => (
          <TimeDropDown
            close={close}
            setlectedMinute={setlectedMinute}
            selectedHour={selectedHour}
            handleSubmit={handleSubmit}
            handleSelectHour={handleSelectHour}
            handleSelectMinute={handleSelectMinute}
          />
        )}
      </Popover.Panel>
    </Popover>
  );
}

type TimeDropDown = {
  handleSelectHour: (hour: number) => void;
  handleSelectMinute: (hour: number) => void;
  handleSubmit: () => void;
  close: () => void;
  selectedHour: number;
  setlectedMinute: number;
};
function TimeDropDown({
  handleSubmit,
  handleSelectHour,
  handleSelectMinute,
  selectedHour,
  setlectedMinute,
  close,
}: TimeDropDown) {
  const hours: number[] = useMemo(() => {
    return Array.from({ length: 24 }, (_, index): number => index);
  }, []);

  const minutes: number[] = useMemo(() => {
    return Array.from({ length: 60 }, (_, index): number => index);
  }, []);

  return (
    <div className="absolute bg-gray-50 border shadow-sm w-full h-60 z-50 rounded-md top-10 p-2 flex flex-col justify-between">
      <div className="grow h-3/4 flex justify-around">
        <div className="flex flex-col overflow-scroll cursor-pointer">
          {hours.map((hour: number): ReactNode => {
            return (
              <button
                className={`rounded-sm p-1 px-2  hover:bg-green-100 ${
                  selectedHour === hour ? "border border-green-400" : ""
                }`}
                onClick={() => handleSelectHour(hour)}
                key={hour}
              >
                {hour}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col overflow-scroll ">
          {minutes.map((minute: number): ReactNode => {
            return (
              <button
                className={`rounded-sm p-1 px-2 hover:bg-green-100 ${
                  setlectedMinute === minute ? "border border-green-400" : ""
                }`}
                onClick={() => handleSelectMinute(minute)}
                key={minute}
              >
                {minute}
              </button>
            );
          })}
        </div>
      </div>
      <hr />

      <div className="pt-3 w-full">
        <button
          onClick={() => {
            close();
            handleSubmit();
          }}
          className="rounded-md w-full bg-blue-500 hover:bg-blue-600 py-1 active:bg-blue-500 text-white px-2"
        >
          submit
        </button>
      </div>
    </div>
  );
}

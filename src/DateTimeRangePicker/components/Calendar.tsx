import { useState, useMemo } from "react";
import Shortcuts from "./Shortcuts";
import { useDTRP } from "../hooks/useDTRP";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import LeftArrow from "../../assets/leftArrow.svg";
import RightArrow from "../../assets/rightArrow.svg";
import CalendarFooter from "./CalendarFooter";

export default function Calendar({ close }: { close: () => void }) {
  const { DTRP_State, setDateTimeRange } = useDTRP();
  const startDate = DTRP_State.DateTimeRange[0];
  const endDate = DTRP_State.DateTimeRange[1];
  const [visibleMonths, setVisibleMonths] = useState<Date>(
    startDate ?? new Date()
  );

  const visibleDates = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(visibleMonths)),
      end: endOfWeek(endOfMonth(visibleMonths)),
    });
  }, [visibleMonths]);

  const hilightedRange = useMemo(() => {
    if (startDate && endDate) {
      if (startDate < endDate) {
        return eachDayOfInterval({
          start: startDate,
          end: endDate,
        })
          .slice(1, -1)
          .map((date) => date.getTime());
      }

      return eachDayOfInterval({
        start: endDate,
        end: startDate,
      })
        .slice(1, -1)
        .map((date) => date.getTime());
    }

    return [new Date().getTime()];
  }, [endDate, startDate]);

  const handleIsSameDay = (date: Date): boolean => {
    if (startDate) {
      if (isSameDay(date, startDate)) {
        return true;
      }
    }

    if (endDate) {
      if (isSameDay(date, endDate)) {
        return true;
      }
    }

    return false;
  };

  const handleSubtractOneMonth = () => {
    setVisibleMonths((prevMonth: Date): Date => {
      return addMonths(prevMonth, -1);
    });
  };

  const handleAddOneMonth = () => {
    setVisibleMonths((prevMonth: Date): Date => {
      return addMonths(prevMonth, 1);
    });
  };

  return (
    <div className="absolute min-w-full bg-gray-50 shadow-sm border rounded-md top-4 p-2 flex flex-col gap-3">
      <div className="flex gap-3 ">
        <Shortcuts />
        <div className="select-none flex flex-col gap-4">
          <div className="w-ful flex justify-between items-center ">
            <button
              onClick={handleSubtractOneMonth}
              className="rounded-md p-2 bg-gray-50 shadow-sm border"
            >
              <img src={LeftArrow} alt="left-arrow" />
            </button>
            <div className="">
              <span className="font-medium">
                {format(visibleMonths, "MMM - yyyy")}
              </span>
            </div>
            <button
              onClick={handleAddOneMonth}
              className="rounded-md p-2 bg-gray-50 shadow-sm border"
            >
              <img src={RightArrow} alt="right-arrow" />
            </button>
          </div>
          <div className="flex gap-4">
            <div className=" rounded-md p-2 flex flex-col gap-4  ">
              <div className="flex gap-4 text-sm justify-center font-medium pb-2 border-b text-gray-700">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>
              <div className="grid grid-cols-7 gap-2 text-sm select-none">
                {visibleDates.map((date) => {
                  return (
                    <button
                      key={date.toString()}
                      onClick={() => setDateTimeRange(date)}
                      className={`rounded-md relative p-2 hover:bg-green-100  ${
                        !isSameMonth(date, visibleMonths) && "text-gray-400"
                      }
                  ${
                    handleIsSameDay(date) &&
                    "bg-green-400 hover:bg-green-500 shadow-inner text-white"
                  }
                  ${hilightedRange.includes(date.getTime()) && "bg-green-200 "}
                  `}
                    >
                      {date.getDate()}
                      {isToday(date) && (
                        <span className="absolute rounded-full w-4/6 translate-x-1/4 bg-green-500 h-1 bottom-1 left-0 "></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CalendarFooter close={close} />
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import CalendarButton from "./CalendarButton";
import Calendar from "./Calendar";
import { useDTRP } from "../hooks/useDTRP";
import { ActionNames } from "../constants/DTRP_types";
import { useEffect } from "react";
import { Popover } from "@headlessui/react";

type CalendarContainerProps = {
  startDate: Date | undefined;
  endDate: Date | undefined;
};
export default function CalendarContainer({
  startDate,
  endDate,
}: CalendarContainerProps) {
  const { dispatch } = useDTRP();

  useEffect(() => {
    dispatch({ type: ActionNames.SET_START_DATE, payload: startDate });
    dispatch({ type: ActionNames.SET_END_DATE, payload: endDate });
  }, []);

  return (
    <div>
      <Popover className="relative">
        <Popover.Button>
          <CalendarButton />
        </Popover.Button>

        <Popover.Panel className="absolute z-10">
          {({ close }) => <Calendar close={close} />}
        </Popover.Panel>
      </Popover>
    </div>
  );
}

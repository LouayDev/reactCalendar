/* eslint-disable react-hooks/exhaustive-deps */
import CalendarButton from "./CalendarButton";
import Calendar from "./Calendar";
import { useDTRP } from "../hooks/useDTRP";
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
  const { SetDTRP_State } = useDTRP();

  useEffect(() => {
    SetDTRP_State((prev) => {
      return { ...prev, DateTimeRange: [startDate, endDate] };
    });
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

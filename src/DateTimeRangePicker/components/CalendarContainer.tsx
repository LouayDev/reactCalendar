import CalendarButton from "./CalendarButton";
import Calendar from "./Calendar";
import { useDTRP } from "../hooks/useDTRP";
import { ActionNames } from "../context/DTRPProvider";
import { useEffect } from "react";

type CalendarContainerProps = {
  startDate: Date | undefined;
  endDate: Date | undefined;
};
export default function CalendarContainer({
  startDate,
  endDate,
}: CalendarContainerProps) {
  const { state, dispatch } = useDTRP();
  useEffect(() => {
    dispatch({ type: ActionNames.SET_START_DATE, payload: startDate });
    dispatch({ type: ActionNames.SET_END_DATE, payload: endDate });
  }, []);
  return (
    <div>
      <CalendarButton />
      {state.isOpen && <Calendar />}
    </div>
  );
}

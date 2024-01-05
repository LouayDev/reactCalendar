import DTRP_ContextProvider from "../context/DTRP_Provider";
import CalendarContainer from "./CalendarContainer";

type DTRP_Props = {
  startDate?: Date;
  endDate?: Date;
};

export function DTRP({ startDate, endDate }: DTRP_Props) {
  return (
    <DTRP_ContextProvider>
      <div className="relative p-2">
        <CalendarContainer startDate={startDate} endDate={endDate} />
      </div>
    </DTRP_ContextProvider>
  );
}

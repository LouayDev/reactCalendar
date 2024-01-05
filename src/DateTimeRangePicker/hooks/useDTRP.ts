import { useContext } from "react";
import { DTRPContext } from "../context/DTRPProvider";

export function useDTRP() {
  const context = useContext(DTRPContext);

  if (context === null) {
    throw new Error("useDTRPContext must be used within DTRP_ContextProvider");
  }

  return context;
}

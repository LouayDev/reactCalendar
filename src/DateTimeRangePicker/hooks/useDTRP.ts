import { useContext } from "react";
import { DTRPContext } from "../context/DTRP_Provider";

export function useDTRP() {
  const context = useContext(DTRPContext);

  if (context === null) {
    throw new Error("useDTRPContext must be used within DTRP_ContextProvider");
  }

  return context;
}

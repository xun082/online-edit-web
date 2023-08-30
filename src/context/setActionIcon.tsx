import { createContext } from "react";

import { actionIconContextType } from "@/types";

const ActionIconTypeContext = createContext<actionIconContextType | undefined>(
  undefined,
);

export default ActionIconTypeContext;

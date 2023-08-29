import React, { createContext } from "react";

import { labelType } from "@/types";

export interface actionIconContextType {
  activeIconType: labelType;
  setActiveIconType: React.Dispatch<React.SetStateAction<labelType>>;
}

const ActionIconTypeContext = createContext<actionIconContextType | undefined>(
  undefined,
);

export default ActionIconTypeContext;

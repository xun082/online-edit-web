import { createContext } from "react";

import { treeDataContextType } from "@/types";

const TreeDataContext = createContext<treeDataContextType | undefined>(
  undefined,
);

export default TreeDataContext;

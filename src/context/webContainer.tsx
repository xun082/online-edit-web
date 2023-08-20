import { WebContainer } from "@webcontainer/api";
import { createContext } from "react";

const WebContainerContext = createContext<WebContainer | null>(null);

export default WebContainerContext;

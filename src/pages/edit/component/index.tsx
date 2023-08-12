import File from "./file";
import Search from "./search";
import Setting from "./setting";
import Port from "./port";
import { editorAside } from "./edit-aside";
import ResizeHandle from "./resize-handle";

export { editorAside, ResizeHandle };

export const components = {
  search: Search,
  setting: Setting,
  port: Port,
  file: File,
};

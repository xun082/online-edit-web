import File from "./file";
import Search from "./search";
import Setting from "./setting";
import Port from "./port";
import { editorAsideTop } from "./edit-aside";
import ResizeHandle from "./resize-handle";
import EditHeader from "./edit-header";
import EditorNav from "./edit-nav";

export { editorAsideTop, ResizeHandle, EditHeader, EditorNav };

export const components = {
  search: Search,
  setting: Setting,
  port: Port,
  file: File,
};

/* eslint-disable no-unused-vars */
export type languageType = "html" | "css" | "javascript";
export type labelType = "search" | "setting" | "file" | "port";

export interface LinkData {
  uuid: string;
  src: string;
}

// export namespace WebContainerNP {
//   export enum ActionTypeEnum {
//     Create_File = "Create_File",
//     Create_Dir = "Create_Dir",

//     Del = "Del",

//     Rename = "Rename",
//   }

//   export enum TargetTypeEnum {
//     File,

//     Dir,

//     None,
//   }

//   export const menuOptionsMap = {
//     [TargetTypeEnum.File]: [
//       {
//         value: ActionTypeEnum.Del,
//         text: "删除文件",
//       },

//       {
//         value: ActionTypeEnum.Rename,
//         text: "重命名",
//       },
//     ],

//     [TargetTypeEnum.Dir]: [
//       {
//         value: ActionTypeEnum.Del,
//         text: "删除文件夹",
//       },

//       // {
//       //   value: ActionTypeEnum.Rename,
//       //   text: "重命名",
//       // },

//       {
//         value: ActionTypeEnum.Create_File,
//         text: "新建文件",
//       },

//       {
//         value: ActionTypeEnum.Create_Dir,
//         text: "新建文件夹",
//       },
//     ],

//     [TargetTypeEnum.None]: [
//       {
//         value: ActionTypeEnum.Create_File,
//         text: "新建文件",
//       },

//       {
//         value: ActionTypeEnum.Create_Dir,
//         text: "新建文件夹",
//       },
//     ],
//   };
// }

export enum ActionTypeEnum {
  Create_File = "Create_File",
  Create_Dir = "Create_Dir",

  Create_Root_File = "Create_Root_File",
  Create_Root_Dir = "Create_Root_Dir",

  Del = "Del",

  Rename = "Rename",
}

export const ActionTypeEnumMap = new Map([[ActionTypeEnum.Rename, "重命名"]]);

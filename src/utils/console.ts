// interface DataContent {
//   contentType: string;
//   content: string;
// }

// const errorRun = (): void => {
//   window.parent.postMessage(
//     {
//       type: "errorRun",
//     },
//     "*",
//   );
// };

// const type = (obj: unknown): string =>
//   Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

// const stringify = (
//   data: unknown,
//   hasKey: boolean,
//   isLast: boolean,
//   visited: any[],
//   expandBtn: boolean,
// ): string => {
//   let contentType = type(data);
//   let str = "";
//   let len = 0;
//   let lastComma = isLast ? "" : ",";

//   switch (contentType) {
//     case "object":
//       if (visited.includes(data)) {
//         str += `<span class="string">检测到循环引用</span>`;
//       } else {
//         visited.push(data);
//         let keys = Object.keys(data);
//         len = keys.length;

//         if (len <= 0) {
//           str += hasKey
//             ? `<span class="bracket">{ }${lastComma}</span>`
//             : `<div class="bracket">{ }${lastComma}</div>`;
//         } else {
//           if (expandBtn) {
//             str += `<span class="el-icon-arrow-right expandBtn"></span>`;
//           }
//           str += hasKey
//             ? `<span class="bracket">{</span>`
//             : '<div class="bracket">{</div>';
//           str += '<div class="wrap">';

//           keys.forEach((key, index) => {
//             let childIsJson = ["object", "array"].includes(type(data[key]));
//             str += `
//               <div class="object">
//                 <span class="key">\"${key}\"</span>
//                 <span class="colon">:</span>
//                 ${stringify(data[key], true, index >= len - 1, visited, true)}${
//               index < len - 1 && !childIsJson ? "," : ""
//             }
//               </div>`;
//           });

//           str += "</div>";
//           str += `<div class="bracket">}${lastComma}</div>`;
//         }
//       }
//       break;

//     case "array":
//       if (visited.includes(data)) {
//         str += `<span class="string">检测到循环引用</span>`;
//       } else {
//         visited.push(data);
//         len = (data as any[]).length;

//         if (len <= 0) {
//           str += hasKey
//             ? `<span class="bracket">[ ]${lastComma}</span>`
//             : `<div class="bracket">[ ]${lastComma}</div>`;
//         } else {
//           if (expandBtn) {
//             str += `<span class="el-icon-arrow-right expandBtn"></span>`;
//           }
//           str += hasKey
//             ? `<span class="bracket">[</span>`
//             : '<div class="bracket">[</div>';
//           str += '<div class="wrap">';

//           (data as any[]).forEach((item, index) => {
//             str += `<div class="array">${stringify(
//               item,
//               true,
//               index >= len - 1,
//               visited,
//               true,
//             )}${index < len - 1 ? "," : ""}</div>`;
//           });

//           str += "</div>";
//           str += `<div class="bracket">]${lastComma}</div>`;
//         }
//       }
//       break;

//     default:
//       let res = handleData(data);
//       let quotationMarks = res.contentType === "string" ? '"' : "";
//       str += `<span class="${res.contentType}">${quotationMarks}${res.content}${quotationMarks}</span>`;
//       break;
//   }

//   return str;
// };

// const handleData = (content: unknown): DataContent => {
//   let contentType = type(content);

//   switch (contentType) {
//     case "boolean":
//       content = content ? "true" : "false";
//       break;

//     case "null":
//       content = "null";
//       break;

//     case "undefined":
//       content = "undefined";
//       break;

//     case "symbol":
//       content = (content as Symbol).toString();
//       break;

//     case "function":
//       content = (content as Function).toString();
//       break;

//     case "array":
//     case "object":
//       content = stringify(content, false, true, [], false);
//       break;

//     default:
//       break;
//   }

//   return {
//     contentType,
//     content: content as string,
//   };
// };

// let countIndex: Record<string, number> = {};
// if (sessionStorage.getItem("CONSOLE_COUNT")) {
//   countIndex = JSON.parse(sessionStorage.getItem("CONSOLE_COUNT") || "{}");
// }

// let timeData: Record<string, number> = {};

// const handleArgs = (
//   method: string,
//   contents: any[],
// ): { method: string; args: any[] | null } => {
//   // ... The handleArgs function remains unchanged ...
// };

// class ProxyConsole {
//   sendConsoleMessage(method: string, args: any[]): void {
//     // ... The sendConsoleMessage function remains unchanged ...
//   }

//   // ... The rest of the ProxyConsole methods remain unchanged ...
// }

// const onMessage = ({ data = {} }: { data: any }): void => {
//   // ... The onMessage function remains unchanged ...
// };

// window.onerror = (message, source, lineno, colno, error) => {
//   errorRun();
//   window.parent.postMessage(
//     {
//       type: "console",
//       method: "string",
//       data: [message, source, lineno, colno, error].map(item =>
//         handleData(item),
//       ),
//     },
//     "*",
//   );
// };

// window.addEventListener("unhandledrejection", err => {
//   errorRun();
//   window.parent.postMessage(
//     {
//       type: "console",
//       method: "string",
//       data: [handleData(err.reason.stack)],
//     },
//     "*",
//   );
// });

// window.console = new ProxyConsole();
// window.addEventListener("message", onMessage);

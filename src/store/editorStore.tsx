import { create } from 'zustand';
import monacoForTypes, { editor } from 'monaco-editor';

interface EditorAction {
  setEditor: (index: number, editor: editor.IStandaloneCodeEditor) => void;
  removeEditor: (index: number) => void;
  getEditor: (
    index: number | null,
  ) => editor.IStandaloneCodeEditor | (editor.IStandaloneCodeEditor | null)[] | null;
}

interface EditorState {
  editors: (editor.IStandaloneCodeEditor | null)[];
}

export const useEditorStore = create<EditorState & EditorAction>((set, get) => ({
  editors: [],

  setEditor: (index: number, editor: editor.IStandaloneCodeEditor) => {
    set((state) => {
      const preEditors = [...state.editors];
      preEditors[index] = editor;

      return {
        editors: [...preEditors],
      };
    });
  },

  getEditor: (index: number | null) => {
    if (index === null) return get().editors;

    return get().editors[index] || null;
  },
  removeEditor(index: number) {
    set((state) => {
      const preEditors = [...state.editors];
      preEditors[index] = null;

      return {
        editors: [...preEditors],
      };
    });
  },
}));

interface MonacoState {
  monacos: (typeof monacoForTypes | null)[];
}

interface MonacoAction {
  setMonaco: (index: number, monaco: typeof monacoForTypes) => void;
  getMonaco: (index: number) => typeof monacoForTypes | null;
}

export const useMonacoStore = create<MonacoState & MonacoAction>((set, get) => ({
  monacos: [],

  setMonaco: (index: number, monaco: typeof monacoForTypes) => {
    set((state) => {
      const preMonacos = [...state.monacos];
      preMonacos[index] = monaco;

      return {
        monacos: [...preMonacos],
      };
    });
  },

  getMonaco: (index: number) => {
    return get().monacos[index] || null;
  },
}));
// filename 为model对应文件名,id为uuid
export type modelInfoType = {
  filename: string;
  language: string;
  value: string;
  id: string;
};

export type modelType = modelInfoType & { model: editor.ITextModel; usedBy: number[] };
export type modelsType = modelType[];

interface ModelsState {
  models: modelsType | [];
}
interface ModelsAction {
  setModels: (
    modelInfo: modelInfoType,
    model: editor.ITextModel,
    editorId: number,
    id: string,
  ) => void;
  removeModel: (id: string, editorId: number) => any;
  removeAllModel: (editorId: number) => void;
}
export const useModelsStore = create<ModelsState & ModelsAction>((set, get) => ({
  models: [],

  setModels: (modelInfo: modelInfoType, model: editor.ITextModel, editorId: number) => {
    if (!modelInfo || typeof modelInfo !== 'object' || !modelInfo.hasOwnProperty('filename')) {
      // console.error('Invalid modelInfo passed to setModels.');

      return;
    }

    set((state) => {
      const existingModelIndex = state.models.findIndex((m) => m.id === modelInfo.id);

      if (existingModelIndex === -1) {
        return {
          models: [
            ...(state.models || []),
            {
              ...modelInfo,
              model,
              usedBy: [editorId],
            },
          ],
        };
      } else {
        if (state.models[existingModelIndex].usedBy.includes(editorId)) {
          return state;
        } else {
          const preModels = [...state.models];
          preModels[existingModelIndex].usedBy.push(editorId);

          return {
            models: [...preModels],
          };
        }
      }
    });
  },

  removeModel: (id: string, editorId: number) => {
    set((state) => {
      const existingModelIndex = state.models.findIndex((m) => m.id === id);

      if (existingModelIndex !== -1) {
        const preModels = [...state.models];

        if (preModels[existingModelIndex].usedBy.includes(editorId)) {
          preModels[existingModelIndex].usedBy = preModels[existingModelIndex].usedBy.filter(
            (eid) => eid !== editorId,
          );

          if (preModels[existingModelIndex].usedBy.length === 0) {
            return {
              models: [...preModels.filter((model) => model.id !== id)],
            };
          } else {
            return {
              models: [...preModels],
            };
          }
        }
      }

      return {
        models: state.models,
      };
    });

    return (
      get()
        .models.filter((model) => model.usedBy.includes(editorId))
        .at(-1) || null
    );
  },
  removeAllModel: (editorId: number) => {
    set((state) => {
      const updatedModels = state.models
        .map((model) => {
          if (model.usedBy.includes(editorId)) {
            const updatedUsedBy = model.usedBy.filter((id) => id !== editorId);

            return {
              ...model,
              usedBy: updatedUsedBy,
            };
          }

          return model;
        })
        .filter((model) => model.usedBy.length > 0);

      return {
        models: updatedModels,
      };
    });
  },
}));

// modelId原为model对应文件名，为满足打开多个同名文件修改为对应文件的uuid
interface activeModelState {
  activeMap: { modelId: string; model: modelType | null }[];
}

interface activeModelAction {
  setActiveModel: (modelId: string, model: modelType, editorId: number) => void;
  clearActiveModel: (editorId: number) => void;
}

export const useActiveModelStore = create<activeModelState & activeModelAction>((set) => ({
  activeMap: [],
  setActiveModel: (modelId: string, model: modelType, editorId: number) =>
    set((state) => {
      const preActiveMap = [...state.activeMap];
      preActiveMap[editorId] = { modelId, model };

      return { activeMap: preActiveMap };
    }),

  clearActiveModel: (editorId: number) =>
    set((state) => {
      const preActiveMap = [...state.activeMap];
      preActiveMap[editorId] = { modelId: '', model: null };

      return { activeMap: preActiveMap };
    }),
}));
interface splitState {
  splitState: boolean[];
}

interface splitAction {
  addSplit: () => void;
  removeSplit: (index: number) => void;
}

export const useSplitStore = create<splitState & splitAction>((set) => ({
  splitState: [false, false, false],

  addSplit: () => {
    set((state) => {
      const index = state.splitState.findIndex((s) => s === false);

      if (index !== -1) {
        const newState = [...state.splitState];
        newState[index] = true;

        return { splitState: newState };
      }

      return state;
    });
  },

  removeSplit: (index: number) => {
    set((state) => {
      const newState = [...state.splitState];

      if (index >= 0 && index < newState.length) {
        newState[index] = false;
      }

      return { splitState: newState };
    });
  },
}));

interface ActiveEditorState {
  activeEditor: editor.IStandaloneCodeEditor | null;
  activeEditorId: number;
}

interface ActiveEditorAction {
  setActiveEditor: (editor: editor.IStandaloneCodeEditor, index: number) => void;
}

// 标记active状态下的editor，默认第一个
export const useActiveEditorStore = create<ActiveEditorState & ActiveEditorAction>((set) => ({
  activeEditor: null,
  activeEditorId: -1,

  setActiveEditor: (editor, index) => {
    set({
      // 更新状态
      activeEditor: editor,
      activeEditorId: index,
    });
  },
}));

import { create } from 'zustand';
import monacoForTypes, { editor } from 'monaco-editor';

interface EditorAction {
  setEditor: (index: number, editor: editor.IStandaloneCodeEditor) => void;
  getEditor: (index: number) => editor.IStandaloneCodeEditor | null;
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

  getEditor: (index: number) => {
    return get().editors[index] || null;
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

export type modelInfoType = {
  notInitial?: boolean;
  shown?: boolean;
  readOnly?: boolean;
  tested?: boolean;
  filename: string;
  value: string;
  language: string;
};

export type modelType = modelInfoType & { model: editor.ITextModel; usedBy: number[] };
export type modelsType = modelType[];

interface ModelsState {
  models: modelsType | [];
}
interface ModelsAction {
  setModels: (modelInfo: any, model: any, editorId: number) => void;
  removeModel: (filename: string, editorId: number) => any;
}
export const useModelsStore = create<ModelsState & ModelsAction>((set, get) => ({
  models: [],

  setModels: (modelInfo, model, editorId: number) => {
    if (!modelInfo || typeof modelInfo !== 'object' || !modelInfo.hasOwnProperty('filename')) {
      console.error('Invalid modelInfo passed to setModels.');

      return; // 退出函数，不执行后续操作
    }

    set((state) => {
      const existingModelIndex = state.models.findIndex((m) => m.filename === modelInfo.filename);

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

  removeModel: (filename: string, editorId: number) => {
    set((state) => {
      const existingModelIndex = state.models.findIndex((m) => m.filename === filename);

      if (existingModelIndex !== -1) {
        const preModels = [...state.models];

        if (preModels[existingModelIndex].usedBy.includes(editorId)) {
          preModels[existingModelIndex].usedBy = preModels[existingModelIndex].usedBy.filter(
            (id) => id !== editorId,
          );

          if (preModels[existingModelIndex].usedBy.length === 0) {
            return {
              models: [...preModels.filter((model) => model.filename !== filename)],
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
}));

interface CurrentModleState {
  currentMap: { modelId: string; model: editor.ITextModel | null }[];
}

interface CurrentModleAction {
  setCurrentModel: (modelId: string, model: editor.ITextModel, editorId: number) => void;
  clearCuurentModel: (editorId: number) => void;
}

export const useCurrentModelStore = create<CurrentModleState & CurrentModleAction>((set) => ({
  currentMap: [],
  setCurrentModel: (modelId: string, model: editor.ITextModel, editorId: number) =>
    set((state) => {
      const preCurrentMap = [...state.currentMap];
      preCurrentMap[editorId] = { modelId, model };

      return { currentMap: preCurrentMap };
    }),
  clearCuurentModel: (editorId: number) =>
    set((state) => {
      const preCurrentMap = [...state.currentMap];
      preCurrentMap[editorId] = { modelId: '', model: null };

      return { currentMap: preCurrentMap };
    }),
}));
interface splitState {
  splitCount: number;
}

interface splitAction {
  setSplitCount: (splitCount: number) => void;
  addSplit: () => void;
  removeSplit: () => void;
}

export const useSplitStore = create<splitState & splitAction>((set) => ({
  splitCount: 1,

  setSplitCount: (splitCount: number) => {
    if (splitCount >= 1 && splitCount <= 3) {
      set({ splitCount });
    }
  },

  addSplit: () => {
    set((state) => {
      if (state.splitCount < 3) {
        return { splitCount: state.splitCount + 1 };
      }

      return state;
    });
  },

  removeSplit: () => {
    set((state) => {
      if (state.splitCount > 1) {
        return { splitCount: state.splitCount - 1 };
      }

      return state;
    });
  },
}));

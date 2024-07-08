import { create } from 'zustand';
import monacoForTypes, { editor } from 'monaco-editor';

interface editorAction {
  setEditor: (editor: editor.IStandaloneCodeEditor) => void;
}

interface editorState {
  editor: editor.IStandaloneCodeEditor | null;
}
export const useEditorStore = create<editorState & editorAction>((set) => ({
  editor: null,
  setEditor: (editor: editor.IStandaloneCodeEditor) => set({ editor }),
}));

interface monacoState {
  monaco: typeof monacoForTypes | null;
}
interface monacoAction {
  setMonaco: (editor: editor.IStandaloneCodeEditor) => void;
}

export const useMonacoStore = create<monacoState & monacoAction>((set) => ({
  monaco: null,
  setMonaco: (monaco: typeof monacoForTypes) => set({ monaco }),
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

export type modelType = modelInfoType & { model: editor.ITextModel };
export type modelsType = modelType[];

interface ModelsState {
  models: modelsType | [];
}
interface ModelsAction {
  setModels: (modelInfo: any, model: any) => void;
  removeModel: (filename: string) => any;
}
export const useModelsStore = create<ModelsState & ModelsAction>((set, get) => ({
  models: [],

  setModels: (modelInfo, model) => {
    if (!modelInfo || typeof modelInfo !== 'object' || !modelInfo.hasOwnProperty('filename')) {
      console.error('Invalid modelInfo passed to setModels.');

      return; // 退出函数，不执行后续操作
    }

    set((state) => {
      const existingModelIndex = state.models.findIndex((m) => m.filename === modelInfo.filename);

      if (existingModelIndex === -1) {
        // 如果没有找到相同filename的模型，则添加新模型
        return {
          models: [
            ...(state.models || []),
            {
              ...modelInfo,
              model,
            },
          ],
        };
      } else {
        // 如果找到了相同filename的模型，则不进行任何操作
        return state;
      }
    });
  },

  removeModel: (filename: string) => {
    set((state) => {
      const updatedModels = state.models.filter((model) => model.filename !== filename);

      return { models: updatedModels };
    });

    return get().models[get().models.length - 1] || null;
  },
}));

interface CurrentModleState {
  modelId: string;
  model: editor.ITextModel | null;
}

interface CurrentModleAction {
  setCurrentModel: (modelId: string, model: editor.ITextModel) => void;
}

export const useCurrentModelStore = create<CurrentModleState & CurrentModleAction>((set) => ({
  modelId: '',
  model: null,
  setCurrentModel: (modelId: string, model: editor.ITextModel) => set({ modelId, model }),
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

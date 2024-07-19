import monacoForType, { editor } from 'monaco-editor';

import { modelInfoType } from '@/store/editorStore';

export function setModelsFromInfo(
  modelsInfo: modelInfoType[],
  monaco: typeof monacoForType,
  editor: editor.IStandaloneCodeEditor,
  setModels: (
    modelInfo: modelInfoType,
    model: editor.ITextModel,
    editorId: number,
    id: string,
  ) => void,
  setActiveModel: (modelId: string, model: editor.ITextModel, editorId: number) => void,
  editorId: number,
) {
  modelsInfo.forEach((modelInfo) => {
    addNewModel(modelInfo, monaco, editor, setModels, setActiveModel, editorId);
  });
}

export function addNewModel(
  modelInfo: modelInfoType,
  monaco: typeof monacoForType,
  editor: editor.IStandaloneCodeEditor,
  setModels: (
    modelInfo: modelInfoType,
    model: editor.ITextModel,
    editorId: number,
    id: string,
  ) => void,
  setActiveModel: (modelId: string, model: editor.ITextModel, editorId: number) => void,
  editorId: number,
) {
  const modelUri = monaco.Uri.file(modelInfo.id);
  const model =
    monaco.editor.getModel(modelUri) ||
    monaco.editor.createModel(modelInfo.value, modelInfo.language, modelUri);
  // console.log(monaco.editor.getModel(modelUri));
  setActiveModel(modelInfo.id, model, editorId);
  setModels(modelInfo, model, editorId, modelInfo.id);
  editor.setModel(model);
}

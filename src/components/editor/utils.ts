import monacoForType, { editor } from 'monaco-editor';

import { modelInfoType } from '@/store/editorStore';

export function setModelsFromInfo(
  modelsInfo: modelInfoType[],
  monaco: typeof monacoForType,
  editor: editor.IStandaloneCodeEditor,
  setModels: (modelInfo: modelInfoType, model: editor.ITextModel, editorId: number) => void,
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
  setModels: (modelInfo: modelInfoType, model: editor.ITextModel, editorId: number) => void,
  setActiveModel: (modelId: string, model: editor.ITextModel, editorId: number) => void,
  editorId: number,
) {
  const modelUri = monaco.Uri.file(modelInfo.filename);
  const model =
    monaco.editor.getModel(modelUri) ||
    monaco.editor.createModel(modelInfo.value, modelInfo.language, modelUri);

  setActiveModel(modelInfo.filename, model, editorId);
  setModels(modelInfo, model, editorId);
  editor.setModel(model);
}

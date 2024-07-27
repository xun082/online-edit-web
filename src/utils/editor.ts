import monacoForType, { editor } from 'monaco-editor';

import { modelInfoType, modelType } from '@/store/editorStore';

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
  setActiveModel: (modelId: string, model: modelType, editorId: number) => void,
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
  setActiveModel: (modelId: string, model: modelType, editorId: number) => void,
  editorId: number,
) {
  const modelUri = monaco.Uri.file(modelInfo.id);
  const model =
    monaco.editor.getModel(modelUri) ||
    monaco.editor.createModel(modelInfo.value, modelInfo.language, modelUri);
  // console.log(monaco.editor.getModel(modelUri));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  setActiveModel(modelInfo.id, { ...modelInfo, model }, editorId);
  setModels(modelInfo, model, editorId, modelInfo.id);

  return model;
}

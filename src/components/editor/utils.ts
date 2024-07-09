import monacoForType, { editor } from 'monaco-editor';

import { modelInfoType } from '@/store/editorStore';

export function setModelsFromInfo(
  modelsInfo: modelInfoType[],
  monaco: typeof monacoForType,
  editor: editor.IStandaloneCodeEditor,
  setModels: (modelInfo: any, model: any, editorId: number) => void,
  setCurrentModel: (modelId: string, model: editor.ITextModel, editorId: number) => void,
  editorId: number,
) {
  modelsInfo.map((modelInfo, modelIndex) => {
    addNewModel(modelInfo, modelIndex, monaco, editor, setModels, setCurrentModel, editorId);
  });
}

export function addNewModel(
  modelInfo: modelInfoType,
  modelIndex: number,
  monaco: typeof monacoForType,
  editor: editor.IStandaloneCodeEditor,
  setModels: (modelInfo: any, model: any, editorId: number) => void,
  setCurrentModel: (modelId: string, model: editor.ITextModel, editorId: number) => void,
  editorId: number,
) {
  let model = monaco.editor.getModel(monaco.Uri.file(modelInfo.filename));

  if (model === null) {
    model = monaco.editor.createModel(
      modelInfo.value,
      modelInfo.language,
      monaco.Uri.file(modelInfo.filename),
    );
  }

  setCurrentModel(modelInfo.filename, model, editorId);
  console.log(modelInfo, model, editorId);
  setModels(modelInfo, model, editorId);
  editor.setModel(model);
}

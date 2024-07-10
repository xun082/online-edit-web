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
  modelsInfo.map((modelInfo) => {
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
  let model = monaco.editor.getModel(monaco.Uri.file(modelInfo.filename));

  if (model === null) {
    model = monaco.editor.createModel(
      modelInfo.value,
      modelInfo.language,
      monaco.Uri.file(modelInfo.filename).toString(),
    );
  }

  setActiveModel(modelInfo.filename, model, editorId);
  setModels(modelInfo, model, editorId);
  editor.setModel(model);
}

import monacoForType, { editor } from 'monaco-editor';

import { modelInfoType } from '@/store/editorStore';

export function setModelsFromInfo(
  modelsInfo: modelInfoType[],
  monaco: typeof monacoForType,
  editor: editor.IStandaloneCodeEditor,
  setModels: (modelInfo: any, model: any) => void,
  setCurrentModel: (modelId: string, model: editor.ITextModel) => void,
) {
  setModels(null, null);
  modelsInfo.map((modelInfo, modelIndex) => {
    addNewModel(modelInfo, modelIndex, monaco, editor, setModels, setCurrentModel);
  });
}

export function addNewModel(
  modelInfo: modelInfoType,
  modelIndex: number,
  monaco: typeof monacoForType,
  editor: editor.IStandaloneCodeEditor,
  setModels: (modelInfo: any, model: any) => void,
  setCurrentModel: (modelId: string, model: editor.ITextModel) => void,
) {
  let model = monaco.editor.getModel(monaco.Uri.file(modelInfo.filename));

  if (model === null) {
    model = monaco.editor.createModel(
      modelInfo.value,
      modelInfo.language,
      monaco.Uri.file(modelInfo.filename),
    );
  }

  setCurrentModel(modelInfo.filename, model);
  setModels(modelInfo, model);
  editor.setModel(model);
}

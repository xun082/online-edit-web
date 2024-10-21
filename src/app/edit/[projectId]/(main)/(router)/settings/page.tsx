'use client';

import { FC } from 'react';
import { PiWarningCircleBold } from 'react-icons/pi';
import { VscPreview } from 'react-icons/vsc';
import { editor } from 'monaco-editor';

import { useEditorStore } from '@/store/editorStore';
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { MONACO_THEME_MAP } from '@/utils/';

const selectOptions = [
  { text: 'Edit(auto)', id: 0 },
  { text: 'Save', id: 1 },
  { text: 'KeyStroke', id: 2 },
];

// interface SettingOption {
//   text: string;
//   id: number;
//   icon: ReactNode;
// }

// const editorSettingOptions: SettingOption[] = [
//   { text: 'User settings', id: 0, icon: <VscPreview /> },
//   { text: 'Workspace settings', id: 1, icon: <VscPreview /> },
//   { text: 'User snippets', id: 2, icon: <PiCodeThin /> },
//   { text: 'Workspace snippets', id: 3, icon: <PiCodeThin /> },
// ];

const Settings: FC = () => {
  return (
    <div className="p-4 h-full">
      <div>Settings</div>
      <div>
        <div className="my-2 font-bold">WEBCONTAINERS</div>
        <div className="flex items-center text-sm text-gray-400 my-1">
          <span className="mr-2">Compile trigger</span>
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger>
                <PiWarningCircleBold />
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white" side="right">
                <p>Controls when edited files are synced to the WebContainers filesystem.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CompileSelector />
      </div>
      <div>
        <div className="my-2 font-bold">EDITOR SETTINGS</div>
        <EditorSettings />
      </div>
    </div>
  );
};

const CompileSelector: FC = () => (
  <SelectRoot defaultValue="Edit(auto)">
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Theme" />
    </SelectTrigger>
    <SelectContent>
      {selectOptions.map((option) => (
        <SelectItem value={option.text} key={option.id}>
          {option.text}
        </SelectItem>
      ))}
    </SelectContent>
  </SelectRoot>
);
const ThemeSelector: FC = () => {
  const { getEditor } = useEditorStore();
  const editor = getEditor(0);

  return (
    <SelectRoot
      defaultValue={localStorage.getItem('localTheme') || 'dark-plus'}
      onValueChange={(value) => {
        localStorage.setItem('localTheme', value);
        (editor as editor.IStandaloneCodeEditor)?.updateOptions({ theme: value });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(MONACO_THEME_MAP).map((themeKey) => (
          <SelectItem value={MONACO_THEME_MAP[themeKey]} key={themeKey}>
            {themeKey}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
const EditorSettings: FC = () => (
  <div>
    <div>
      <div className="flex items-center my-2">
        <span className="mx-2 text-base font-medium">
          <VscPreview />
        </span>
        <span>editor setting</span>
      </div>
    </div>
    <ThemeSelector />
  </div>
);

export default Settings;

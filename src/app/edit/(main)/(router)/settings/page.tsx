'use client';

import { FC, ReactNode } from 'react';
import { PiWarningCircleBold, PiCodeThin } from 'react-icons/pi';
import { VscPreview } from 'react-icons/vsc';

import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Menu, MenuItem } from '@/components/menu';

const titleStyle = 'my-2 font-bold';
const textStyle = 'flex items-center text-sm text-gray-400 my-1';

const selectOptions = [
  { text: 'Edit(auto)', id: 0 },
  { text: 'Save', id: 1 },
  { text: 'KeyStroke', id: 2 },
];

interface SettingOption {
  text: string;
  id: number;
  icon: ReactNode;
}

const editorSettingOptions: SettingOption[] = [
  { text: 'User settings', id: 0, icon: <VscPreview /> },
  { text: 'Workspace settings', id: 1, icon: <VscPreview /> },
  { text: 'User snippets', id: 2, icon: <PiCodeThin /> },
  { text: 'Workspace snippets', id: 3, icon: <PiCodeThin /> },
];

const Settings: FC = () => (
  <div className="p-4 h-full">
    <div>Settings</div>
    <div>
      <div className={titleStyle}>WEBCONTAINERS</div>
      <div className={textStyle}>
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
      <div className={titleStyle}>EDITOR SETTINGS</div>
      <EditorSettings />
    </div>
  </div>
);

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

const EditorSettings: FC = () => (
  <div>
    <Menu>
      {editorSettingOptions.map((option) => (
        <MenuItem key={option.id}>
          <div className="flex items-center">
            <span className="mx-2">{option.icon}</span>
            <span>{option.text}</span>
          </div>
        </MenuItem>
      ))}
    </Menu>
  </div>
);

export default Settings;

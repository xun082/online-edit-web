import { FC, ReactNode } from 'react';
import { PiWarningCircleBold, PiCodeThin } from 'react-icons/pi';
import { VscPreview } from 'react-icons/vsc';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Menu, MenuItem } from '@/components/menu';

const Settings: FC = () => {
  const titleStyle = 'my-2 font-bold';

  return (
    <div className="p-4 h-full">
      <div>Settings</div>
      <div>
        <div className={titleStyle}>WEBCONTAINERS</div>
        <div className="flex items-center text-sm text-gray-400 my-1">
          <span className="mr-2">Compile trigger</span>
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger>
                <PiWarningCircleBold />
              </TooltipTrigger>
              <TooltipContent className="bg-gray-800 text-white" side={'right'}>
                <p>Controls when edited files are synced tothe WebContainers filesystem.</p>
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
};

const CompileSelector: FC = () => {
  const selectOptions = [
    {
      text: 'Edit(auto)',
      id: 0,
    },
    {
      text: 'Save',
      id: 1,
    },
    {
      text: 'KeyStroke',
      id: 2,
    },
  ];

  return (
    <Select defaultValue="Edit(auto)">
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
    </Select>
  );
};

const EditorSettings: FC = () => {
  interface settingOption {
    text: string;
    id: number;
    icon: ReactNode;
  }

  const editorSettingOptions: Array<settingOption> = [
    {
      text: 'User settings',
      id: 0,
      icon: <VscPreview />,
    },
    {
      text: 'Workspace settings',
      id: 1,
      icon: <VscPreview />,
    },
    {
      text: 'User snippets',
      id: 2,
      icon: <PiCodeThin />,
    },
    {
      text: 'Workspace snippets',
      id: 3,
      icon: <PiCodeThin />,
    },
  ];

  return (
    <div>
      <Menu>
        {editorSettingOptions.map((option) => (
          <MenuItem>
            <div className="flex items-center">
              <span className="mx-2">{option.icon}</span>
              <span> {option.text}</span>
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Settings;

import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './index'; // 确保路径正确

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  subcomponents: { TooltipTrigger, TooltipContent, TooltipProvider },
} as Meta;

const Template: StoryFn<typeof TooltipContent> = (args) => (
  <TooltipProvider delayDuration={500}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Hover or Focus me</button>
      </TooltipTrigger>
      <TooltipContent {...args}>
        <p>This is a tooltip content</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const Default = Template.bind({});
Default.args = {
  sideOffset: 4,
};

export const WithDifferentPosition: StoryFn = () => (
  <TooltipProvider delayDuration={500}>
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Top</button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Right</button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Bottom</button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Left</button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
);

export const CustomStyles: StoryFn = () => (
  <TooltipProvider delayDuration={500}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Hover or Focus me</button>
      </TooltipTrigger>
      <TooltipContent className="bg-red-500 text-white">
        <p>Custom styled tooltip content</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const WithDelay: StoryFn = () => (
  <TooltipProvider delayDuration={1000}>
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Hover or Focus me</button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This tooltip has a custom delay</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const InsideMenu: StoryFn = () => (
  <TooltipProvider delayDuration={500}>
    <div className="flex flex-col gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-pointer">Item 1</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip for Item 1</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-pointer">Item 2</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip for Item 2</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-pointer">Item 3</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip for Item 3</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
);

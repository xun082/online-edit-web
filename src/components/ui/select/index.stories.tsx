import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectItem,
  SelectSeparator,
  SelectGroup,
  SelectLabel,
} from './index';

export default {
  title: 'Components/Select',
  component: SelectRoot,
} as Meta;

const Template: StoryFn<typeof SelectRoot> = (args) => (
  <SelectRoot {...args}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectScrollUpButton />
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectRoot>
);

export const Default = Template.bind({});
Default.args = {
  defaultValue: 'option1',
};

export const WithSeparator: StoryFn = () => (
  <SelectRoot defaultValue="option1">
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectScrollUpButton />
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectSeparator />
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectRoot>
);

export const WithLabel: StoryFn = () => (
  <SelectRoot defaultValue="option1">
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Options</SelectLabel>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectGroup>
    </SelectContent>
  </SelectRoot>
);

export const ScrollButtons: StoryFn = () => (
  <SelectRoot defaultValue="option1">
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectScrollUpButton />
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectRoot>
);

export const DisabledOptions: StoryFn = () => (
  <SelectRoot defaultValue="option1">
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2" disabled>
        Option 2 (Disabled)
      </SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </SelectContent>
  </SelectRoot>
);

export const CustomStyles: StoryFn = () => (
  <SelectRoot defaultValue="option1">
    <SelectTrigger className="w-[180px] bg-blue-500 text-white">
      <SelectValue placeholder="Custom Style" />
    </SelectTrigger>
    <SelectContent className="bg-blue-500 text-white">
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
      <SelectItem value="option3">Option 3</SelectItem>
    </SelectContent>
  </SelectRoot>
);

export const GroupedOptions: StoryFn = () => (
  <SelectRoot defaultValue="group1-option1">
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Group 1</SelectLabel>
        <SelectItem value="group1-option1">Option 1</SelectItem>
        <SelectItem value="group1-option2">Option 2</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Group 2</SelectLabel>
        <SelectItem value="group2-option1">Option 1</SelectItem>
        <SelectItem value="group2-option2">Option 2</SelectItem>
      </SelectGroup>
    </SelectContent>
  </SelectRoot>
);

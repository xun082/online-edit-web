import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Input, InputProps } from './index';

export default {
  title: 'Components/Input',
  component: Input,
} as Meta;

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  placeholder: 'Enter text...',
};

export const Disabled = Template.bind({});
Disabled.args = {
  type: 'text',
  placeholder: 'Disabled input...',
  disabled: true,
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  type: 'text',
  defaultValue: 'Default value',
};

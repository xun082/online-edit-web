import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Button, ButtonProps } from './index';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Button',
  variant: 'default',
  size: 'default',
};

export const Destructive = Template.bind({});
Destructive.args = {
  children: 'Destructive Button',
  variant: 'destructive',
  size: 'default',
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline Button',
  variant: 'outline',
  size: 'default',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Button',
  variant: 'secondary',
  size: 'default',
};

export const Ghost = Template.bind({});
Ghost.args = {
  children: 'Ghost Button',
  variant: 'ghost',
  size: 'default',
};

export const Link = Template.bind({});
Link.args = {
  children: 'Link Button',
  variant: 'link',
  size: 'default',
};

export const Small = Template.bind({});
Small.args = {
  children: 'Small Button',
  variant: 'default',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large Button',
  variant: 'default',
  size: 'lg',
};

export const Icon = Template.bind({});
Icon.args = {
  children: 'Icon Button',
  variant: 'default',
  size: 'icon',
};

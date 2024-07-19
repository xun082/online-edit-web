import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Badge, BadgeProps } from './index';

export default {
  title: 'Components/Badge',
  component: Badge,
} as Meta;

const Template: StoryFn<BadgeProps> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Badge',
  variant: 'default',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary Badge',
  variant: 'secondary',
};

export const Destructive = Template.bind({});
Destructive.args = {
  children: 'Destructive Badge',
  variant: 'destructive',
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Outline Badge',
  variant: 'outline',
};

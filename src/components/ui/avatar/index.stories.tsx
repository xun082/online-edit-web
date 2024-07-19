import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Avatar, AvatarImage, AvatarFallback } from './index';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  subcomponents: { AvatarImage, AvatarFallback },
} as Meta;

type AvatarProps = {
  src: string;
  alt: string;
  fallback: string;
};

const Template: StoryFn<AvatarProps> = (args) => (
  <Avatar>
    <AvatarImage src={args.src} alt={args.alt} />
    <AvatarFallback>{args.fallback}</AvatarFallback>
  </Avatar>
);

export const Default = Template.bind({});
Default.args = {
  src: 'https://via.placeholder.com/150',
  alt: 'Avatar Image',
  fallback: 'AB',
};

export const WithFallback = Template.bind({});
WithFallback.args = {
  src: '',
  alt: 'Avatar Image',
  fallback: 'AB',
};

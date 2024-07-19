import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { ScrollArea, ScrollBar } from './index';

export default {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  subcomponents: { ScrollBar },
} as Meta;

const Template: StoryFn = (args) => (
  <div style={{ height: '200px', width: '200px' }}>
    <ScrollArea {...args}>
      <div style={{ height: '400px', width: '400px', backgroundColor: '#f0f0f0' }}>
        This is a scrollable content area. Add more content here to see the scrollbars in action.
      </div>
    </ScrollArea>
  </div>
);

export const Default = Template.bind({});
Default.args = {};

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './index';
export default {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: { AccordionItem, AccordionTrigger, AccordionContent },
} as Meta;

const Template: StoryFn<typeof AccordionContent> = () => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Accordion Trigger</AccordionTrigger>
      <AccordionContent>
        <div>Accordion Content</div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const Default = Template.bind({});

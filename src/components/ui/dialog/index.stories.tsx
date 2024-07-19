import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Cross2Icon } from '@radix-ui/react-icons';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './index';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  subcomponents: {
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
  },
} as Meta;

const Template: StoryFn = () => (
  <Dialog>
    <DialogTrigger asChild>
      <button className="p-2 bg-blue-500 text-white rounded">Open Dialog</button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>This is the dialog description</DialogDescription>
      </DialogHeader>
      <div className="mt-4">Dialog Content</div>
      <DialogFooter>
        <button className="p-2 bg-gray-200 rounded">Cancel</button>
        <button className="p-2 bg-blue-500 text-white rounded">Confirm</button>
      </DialogFooter>
      <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </Dialog>
);

export const Default = Template.bind({});
Default.args = {};

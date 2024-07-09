export interface IStepQueue {
  condition: string;
  title: string;
}

export const stepQueue: Array<IStepQueue> = [
  // {
  //   condition: '-1',
  //   title: 'Error-status',
  // },
  {
    condition: '2',
    title: 'Booting WebContainer',
  },
  {
    condition: ' 1',
    title: 'Installing dependencies',
  },
  {
    condition: '0',
    title: 'Running start command',
  },
];

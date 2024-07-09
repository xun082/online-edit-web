export interface IStepQueue {
  condition: number;
  title: string;
}
export const stepQueue: Array<IStepQueue> = [
  // {
  //     condition: -1,
  //     title: 'Error-status',
  // },
  {
    condition: 0,
    title: 'Booting WebContainer',
  },
  {
    condition: 0,
    title: 'Installing dependencies',
  },
  {
    condition: 0,
    title: 'Running start command',
  },
];

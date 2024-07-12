import { create } from 'zustand';

interface DragIconState {
  dragIconRef: any;
}

interface DragIconActions {
  setDragIconRef: (ref: any) => void;
}

export const useDragIconStore = create<DragIconState & DragIconActions>((set) => ({
  dragIconRef: null,
  setDragIconRef: (dragIconRef: any) => set(() => ({ dragIconRef })),
}));

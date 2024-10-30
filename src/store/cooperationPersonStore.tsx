import { create } from 'zustand';

interface CooperationPersonState {
  persons: string[];
}

interface CooperationPersonActions {
  addPersons: (newPersons: string[]) => void;
  removePersons: (personsToRemove: string[]) => void;
  getPersons: () => string[];
  setPersons: (persons: any[]) => void;
}

export const useCooperationPerson = create<CooperationPersonState & CooperationPersonActions>(
  (set, get) => ({
    persons: [],

    addPersons: (newPersons) => {
      set((state) => ({
        persons: Array.from(new Set([...state.persons, ...newPersons])),
      }));
    },

    removePersons: (personsToRemove) => {
      set((state) => ({
        persons: state.persons.filter((id) => !personsToRemove.includes(id)),
      }));
    },

    getPersons: () => {
      return get().persons;
    },
    setPersons: (persons) => {
      set({ persons: persons });
    },
  }),
);

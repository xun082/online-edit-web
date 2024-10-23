import create from 'zustand';

interface CooperationPersonState {
  persons: number[];
}

interface CooperationPersonActions {
  addPersons: (newPersons: number[]) => void;
  removePersons: (personsToRemove: number[]) => void;
  getPersons: () => number[];
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
  }),
);

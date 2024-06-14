import { create } from "zustand";

const useSearchResults = create((set) => ({
    searchResults: null,
    setSearchResults: (searchResults) => set({ searchResults }),
}));

export default useSearchResults;
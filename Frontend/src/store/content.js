
import { create } from "zustand";

export const useContentStore = create((set) => ({
    contentType: localStorage.getItem("defaultContentType") || "movie", // Default to movies
    setContentType: (type) => {
      localStorage.setItem("defaultContentType", type); // Save user preference
      set({ contentType: type });
    },
  }));
   
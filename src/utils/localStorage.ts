import type { SavedItem, SearchResult } from "../types";

const SAVED_ITEMS_KEY = "smart-search-saved-items";

export const saveItem = (item: SearchResult): void => {
  const saved = getSavedItems();
  const newItem: SavedItem = {
    ...item,
    savedAt: new Date().toISOString(),
  };
  const updated = [...saved, newItem];
  localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(updated));
};

export const removeSavedItem = (id: string): void => {
  const saved = getSavedItems();
  const updated = saved.filter((item) => item.id !== id);
  localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(updated));
};

export const getSavedItems = (): SavedItem[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(SAVED_ITEMS_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const isItemSaved = (id: string): boolean => {
  return getSavedItems().some((item) => item.id === id);
};

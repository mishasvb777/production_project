import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

export const getScrollSaveScroll = (state: StateSchema) => state.scrollSave.scroll;
export const getScrollSaveByPath = createSelector(
  getScrollSaveScroll, 
  (state: StateSchema, path: string) => path, // здесь получаем весь объект, дальше из этого объекта передаем path
  (scroll, path) => scroll[path] || 0, //
)
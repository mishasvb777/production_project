
export type ScrollSchema = Record<string, number> // <Адрес страницы, позиция скролла>

export interface ScrollSaveSchema {
  scroll: ScrollSchema;
}
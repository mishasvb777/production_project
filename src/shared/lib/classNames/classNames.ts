// Хелпер для генерации класс неймов

export type Mods = Record<string, boolean | string | undefined> // Record указывает что ключ будет стринг, а значение либо boolean или string

export function classNames (
  cls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = []
): string {
  return [
    cls,
    ...additional.filter(Boolean), // исключаем что в этот массив могут прилететь undefined
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([cls, value]) => cls)
  ].join(' ')
}

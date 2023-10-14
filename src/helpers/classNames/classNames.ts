//Хелпер для генерации класс неймов

type Mods = Record<string, boolean | string> // Record указывает что ключ будет стринг, а значение либо boolean или string

export function classNames(cls: string, mods: Mods, additional: string[]): string {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
      .filter(([cls, value]) => Boolean(value))
      .map(([cls, value]) => cls)
  ].join(' ')
}


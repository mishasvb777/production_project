// global.d.ts файл используется для создания глобальных объявлений типов в TypeScript проекте. 
// Он позволяет определить пользовательские 
// типы для глобальных объектов или библиотек, которые не имеют своих официальных объявлений типов.

declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

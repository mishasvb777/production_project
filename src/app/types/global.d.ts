// global.d.ts файл используется для создания глобальных объявлений типов в TypeScript проекте.
// Он позволяет определить пользовательские
// типы для глобальных объектов или библиотек, которые не имеют своих официальных объявлений типов.

declare module '*.scss' {
  type IClassNames = Record<string, string>
  const classNames: IClassNames
  export = classNames
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'frontend' | 'storybook' | 'jest';

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>
} : T;


type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}
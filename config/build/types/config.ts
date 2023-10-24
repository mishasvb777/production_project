// файлик нужен для того что конфигурировать конфиг, до этапа сборки проекта задавать какие то опции из вне
// порт, пути, адресс API с которыми будет работать, режим девелопмент и продакшн, то есть что то общее с чем будет работать наш проект

// описание типов и интерфейсов, где будут опции сборки

export type BuildMode = 'production' | 'development' // тип для режима сборки "mode"

export interface BuildPaths {
  entry: string // путь до энтри поинт
  build: string // путь до папки сборки
  html: string // путь до папки HTML которая лежит в папке public
  src: string
}

export interface BuildEnv { // интерфейс для переменных окружения, которые мы используем когда вызываем функцию которая возвращает config в файле webpack.config.ts
  mode: BuildMode
  port: number
  apiUrl: string
}

export interface BuildOptions {
  mode: BuildMode // режим сборки проекта
  paths: BuildPaths // ПУТИ, путь до энтри поинта, путь до сборки проекта, любые пути которые будут использоваться
  isDev: boolean // isDev будет ровняться true если mode у нас продакшен
  port: number
  apiUrl: string
}

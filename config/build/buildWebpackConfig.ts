// Здесь будет вся конфигурация которая лежит в корне проекта 

import path from "path";
import { BuildOptions } from "./types/config";
import webpack from 'webpack'
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration{ // эта функция будет принимать набор опций, которые соответствуют нашему типу для таких опций
  const {paths, mode, isDev} = options;

  return {
    mode: mode, // мод указывется что бы указать вебпаку, мы разрабатываем приложение или уже публикуем (prodaction или development)
    
    entry: paths.entry, // стартовая точка нашего приложения, делаем так, потому что на разных ОС, пути могут отличаться, а тут он просто собирает путь, по папкам
    output: {
      // куда и как будем делать сборку нашего приложения
      filename: '[name].[contenthash].js', // имя файла где будет собрано наше приложение + кеширование версий проекта, то есть при изменение проекта, и сборке, будет создваться новый файл с проектом
      path: paths.build, // папка где будет находится файл с собранным проектом
      clean: true, // это свойство необходимо для того что бы подчищать старые файлы с проектом
    },
    //Plugins (плагины) используются для выполнения дополнительных задач в процессе сборки проекта
    plugins: buildPlugins(options), // вызов функции из папки build которая возвращает нам плагины 
    module: {  //  module используется для определения правил обработки различных типов файлов. 
        rules: buildLoaders(options), // вызов функции из папки build которая возвращает нам лоадеры
    },
    resolve: buildResolvers(options), // resolve - определение какие расширения фалйов должны быть автоматически разрешены при импорте модулей 
    // import MyComponent from './components/MyComponent'; вместо: import MyComponent from './components/MyComponent.jsx';
    devtool: isDev ? 'inline-source-map' : undefined, // необходим для того что четко видеть в каком файле произошла ошибка, с помощью тернарного оператора и опции 
    // isDev мы можем указывать если режим development то подключи опцию, если production то отключим
    devServer: isDev ? buildDevServer(options) : undefined // dev serever который будет помогать в отладки приложения, например автоматически обновлять бандел при изменениях
  }
}
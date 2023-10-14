// настрокйка сборки проекта, мода, импорта и экспорта (1.1 3:45)

//const path = require('path');
//const HTMLWebpackPlugin = require('html-webpack-plugin');
//const webpack = require('webpack');

import webpack from 'webpack'
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';
import path from 'path';
 // плагин необходим для генерирования HTML файла, на основе шаблона, и вставке в него сгенерированного JS и CSS



export default (env: BuildEnv) => { // возвращаем функцию для того что бы использовать переменные окружения которые мы прописывали в скриптах запуска проекта
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'), 
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'), 
    src: path.resolve(__dirname, 'src'),  
  }
  
  const mode = env.mode || 'development'; // теперь у нас мод зависит от того каким скриптом мы запускаем build, "build:prod" или "build:dev"  
  const isDev = mode === 'development' 
  const PORT = env.port || 3000 // env.port - это переменная окружения которые мы прописываем в скриптах запуска в файле package.json (--env port=3000)
  
  const config : webpack.Configuration = buildWebpackConfig({
  mode,
  paths,
  isDev,
  port: PORT,  
})

  return config;
};

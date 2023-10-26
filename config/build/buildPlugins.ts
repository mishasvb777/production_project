import HTMLWebpackPlugin from 'html-webpack-plugin'
import webpack, { web } from 'webpack'
import { type BuildOptions } from './types/config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

// Простая функция которая будет возвращать нам список плагинов
export function buildPlugins ({ paths, isDev, apiUrl, project }: BuildOptions): webpack.WebpackPluginInstance[] { // webpack.WebpackPluginInstance[] специальный тип для плагинов у вебпака
  const plugins = [
    new HTMLWebpackPlugin({
      // теперь после сборки у нас в папке сбора проекта, будет появляться файл index.html
      template: paths.html // адрес и имя файла который будет использоваться в качестве шаблона
    }),
    new webpack.ProgressPlugin(), // плагин необходим для отображения статуса сборки
    new MiniCssExtractPlugin({ // создает отдельный CSS файл для каждого JS файла где это необходимо, в папке build будет создоваться папка css со стилями
      filename: 'css/[name].[contenthash:8].css', // указываем называния файлов и где они будут распологаться
      chunkFilename: 'css/[name].[contenthash:8].css' // chunkFilename - это когда мы будем разбивать файлы на асинхронные и будут появляться отдельные чанки которые будут асинхронно подгружаться
    }),
    // c помощью него можно прокидывать глобальные переменнные
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev), // не забываем так же проиницаилизировать эту переменную в global.d.ts
      __API__: JSON.stringify(apiUrl), // не забываем так же проиницаилизировать эту переменную в global.d.ts
      __PROJECT__: JSON.stringify(project)
    }),
    
  ]  

  if(isDev){
    plugins.push(new BundleAnalyzerPlugin({
      openAnalyzer: false
    }))
    plugins.push(new webpack.HotModuleReplacementPlugin())    
  }  

  return plugins  
}

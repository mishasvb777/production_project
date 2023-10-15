import webpack from "webpack"
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from "./types/config"
// Простая функция которая будет возвращать нам список лоадеров

export function buildLoaders ({isDev}: BuildOptions): webpack.RuleSetRule[] {  
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack'],
  }

  const cssLoader = { // лоадер для scss файлов 
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader, // MiniCssExtractPlugin.loader для извлечения CSS кода из JavaScript модулей и сохранения его в отдельных CSS файлов.
      // так же ставим условие если у нас режим development то мы используем style-loader (у нас Css файлы будут биндится в кучу) если прод то используем MiniCssExtractPlugin.loader
      // Translates CSS into CommonJS
      { // мы так же можем передавать лоадер в виде объекта 
        loader: "css-loader",
        options: { // опции для лоадеров 
          modules: { // опция для того что бы модули css работали
            auto: (resPath: string) => Boolean(resPath.includes('.module.')), // это для того что бы приминять модульный подход только к тем файлам у которых есть в имени .module., а с обычными css файлами работать к с обычными файлами стилей
            localIdentName: isDev  // для того что бы в продакшен сборке были автосгенерированные названия 
            ? '[path][name]__[local]--[hash:base64:5]' 
            : '[hash:base64:8]'
          },           
        }
      },
      // Compiles Sass to CSS
      "sass-loader",
    ],
  }

  const typescriptLoader = { // Порядок при котором указываются лоадеры, имеют значение, по этому лучше выносить их в одтельную переменную, что бы потом в возвращаемом массиве было видно
    // здесь указываются лоадеры для фалов которые отличаются от js (см 1.1 17:10)    
      test: /\.tsx?$/, // регулярное выражение, определяющиее расширение файла, которое надо пропустить через лоадер
      // так же для обработки jsx нам необходим специальный лоадер, но этот лоадер умеет это делать 
      use: 'ts-loader', // здесь указывается лоадер, которые необходимо использовать для этих файлов
      exclude: /node_modules/, // папка исключения, то есть эту папку обрабатывать не нужно    
  }

  return [
    typescriptLoader, 
    cssLoader,
    svgLoader,
    fileLoader
  ]
}

/* Style-loader, css-loader и sass-loader - это загрузчики (loaders) 
для модульной системы Webpack, которые позволяют обрабатывать 
CSS и SASS файлы в проекте. */
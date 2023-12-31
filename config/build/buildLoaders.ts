import type webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { buildCssLoader } from './loaders/buildCssLoader'
import { BuildOptions } from './types/config'

// Простая функция которая будет возвращать нам список лоадеров

export function buildLoaders ({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  }

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack']
  }

  const cssLoader = buildCssLoader(isDev)

  const typescriptLoader = { // Порядок при котором указываются лоадеры, имеют значение, по этому лучше выносить их в одтельную переменную, что бы потом в возвращаемом массиве было видно
    // здесь указываются лоадеры для фалов которые отличаются от js (см 1.1 17:10)
    test: /\.tsx?$/, // регулярное выражение, определяющиее расширение файла, которое надо пропустить через лоадер
    // так же для обработки jsx нам необходим специальный лоадер, но этот лоадер умеет это делать
    use: 'ts-loader', // здесь указывается лоадер, которые необходимо использовать для этих файлов
    exclude: /node_modules/ // папка исключения, то есть эту папку обрабатывать не нужно
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

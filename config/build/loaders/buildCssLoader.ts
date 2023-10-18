import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildCssLoader(isDev: boolean) {
  return { // лоадер для scss файлов
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // MiniCssExtractPlugin.loader для извлечения CSS кода из JavaScript модулей и сохранения его в отдельных CSS файлов.
      // так же ставим условие если у нас режим development то мы используем style-loader (у нас Css файлы будут биндится в кучу) если прод то используем MiniCssExtractPlugin.loader
      // Translates CSS into CommonJS
      { // мы так же можем передавать лоадер в виде объекта
        loader: 'css-loader',
        options: { // опции для лоадеров
          modules: { // опция для того что бы модули css работали
            auto: (resPath: string) => Boolean(resPath.includes('.module.')), // это для того что бы приминять модульный подход только к тем файлам у которых есть в имени .module., а с обычными css файлами работать к с обычными файлами стилей
            localIdentName: isDev // для того что бы в продакшен сборке были автосгенерированные названия
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:8]'
          }
        }
      },
      // Compiles Sass to CSS
      'sass-loader'
    ]
  }
}
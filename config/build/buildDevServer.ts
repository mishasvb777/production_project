import { BuildOptions } from "./types/config";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server"; // переименоваывае тип в DevServerConfiguration для того что бы небыло 
// пересечения с Configuration из webpack

// файл для конфигурации дев сервера. С помощью дев сервера происходит автоматическое обновления бандла при изменениях в проекте \
export function buildDevServer(options: BuildOptions):  DevServerConfiguration{
  return {
    port: options.port,
    open: true, // свойство будет автоматически открывать в браузере страницу с нашим приложением  
    historyApiFallback: true  //  позволяет приложению обрабатывать все маршруты на стороне клиента, даже если они не соответствуют реальным файлам на сервере.
  }
}
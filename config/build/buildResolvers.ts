import { ResolveOptions } from "webpack";


export function buildResolvers (): ResolveOptions {

  return {
    extensions: ['.tsx', '.ts', '.js'], // это расширение тех файлов, при импорте которых мы не будем указывать расширение этих файлов
  }
}


import { type ResolveOptions } from 'webpack'
import { type BuildOptions } from './types/config'

export function buildResolvers (options: BuildOptions): ResolveOptions {
  return {
    preferAbsolute: true, // абсолютные пути в приоритете
    extensions: ['.tsx', '.ts', '.js'], // это расширение тех файлов, при импорте которых мы не будем указывать расширение этих файлов
    modules: [options.paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {}
  }
}

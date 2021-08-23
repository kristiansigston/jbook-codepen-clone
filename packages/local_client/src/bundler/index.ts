import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from '../plugins/unpkg_path_plugin'
import { fetchPlugin } from '../plugins/fetch_plugin'

type BuildResult = {
  code: string
  err: string
}

let waiting: Promise<void>

export const setupBundle = () => {
  waiting = esbuild.initialize({
    worker: true,
    wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
  })
}

const bundler = async (rawCode: string): Promise<BuildResult> => {
  await waiting
  return esbuild
    .build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': "'production'",
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    })
    .then((result): BuildResult => {
      return {
        code: result.outputFiles[0].text,
        err: '',
      }
    })
    .catch((error) => {
      return {
        code: '',
        err: error.message,
      }
    })
}

export default bundler

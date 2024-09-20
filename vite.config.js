import { defineConfig, loadEnv } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { getData } from './src/data/data'

import { createHtmlPlugin } from 'vite-plugin-html'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const port = parseInt(env.VITE_APP_PORT, 10) || undefined
  const url = env.VITE_APP_SITE_URL
  const siteUrl = mode === 'development' ? `${url}:${port}` : url

  return {
    base: '/',
    server: {
      port: port,
      host: '0.0.0.0',
    },
    plugins: [
      createHtmlPlugin({
        minify: true,
        pages: getData(siteUrl).map((data) => {
          console.log('>>>>', data)
          return {
            template: `${data.page.template}.html`,
            filename: `${data.page.template}.html`,
            injectOptions: {
              data,
              ejsOptions: {
                root: path.join(__dirname, 'src', 'templates'),
              },
            },
          }
        }),
      }),
      //ViteEjsPlugin(getData(homeUrl)),
      //ViteMinifyPlugin({}),
    ],
  }
})

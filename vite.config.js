import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { getData } from './src/data/data'

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
        pages: getData(siteUrl).map((data) => ({
          template: `${data.page.template}.html`,
          filename: `${data.page.template}.html`,
          injectOptions: {
            data,
            ejsOptions: {
              root: path.join(__dirname, 'src', 'templates'),
            },
          },
        })),
      }),
    ],
  }
})

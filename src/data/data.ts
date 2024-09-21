import path from 'node:path'
import fs from 'node:fs'
import config from './app.json'
export interface PageData {
  title: string
  slug: string
  template: string
  description: string
  content: any
}

export interface ConfigData {
  name: string
  siteUrl: string
  email: string
  tagline: string
}

export interface TemplateData {
  app: ConfigData
  page: PageData
}

export function readJsonFileSync<T>(filePath: string): T | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContent) as T
  } catch (error) {
    console.error(`Error reading or parsing JSON from file: ${filePath}`, error)
    return null
  }
}

export function readDirAndParseJsonSync(dirPath: string): PageData[] {
  const resultArray: PageData[] = []
  try {
    const items = fs.readdirSync(dirPath)

    items.forEach((item) => {
      const fullPath = path.join(dirPath, item)
      const stats = fs.statSync(fullPath)

      if (stats.isFile() && path.extname(item) === '.json') {
        const parsedJson = readJsonFileSync<any>(fullPath)
        if (parsedJson) {
          resultArray.push(parsedJson)
        }
      }
    })
  } catch (error) {
    console.error(`Error reading directory: ${dirPath}`, error)
  }

  return resultArray
}

export function getData(siteUrl: string): TemplateData[] {
  const data = readDirAndParseJsonSync(path.resolve(__dirname, 'content'))
  config.siteUrl = siteUrl
  return data.map((page) => ({ app: config, page: page }))
}

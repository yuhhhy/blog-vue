import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 处理单个文件并输出到新目录
async function processFile(inputPath, outputPath) {
  const content = await fs.promises.readFile(inputPath, 'utf8')
  const { content: cleanContent } = matter(content)
  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.promises.writeFile(outputPath, cleanContent)
}

// 处理目录下所有md文件
async function processDirectory(inputDir, outputDir) {
  const files = await fs.promises.readdir(inputDir)
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const inputPath = path.join(inputDir, file)
      const outputPath = path.join(outputDir, file)
      await processFile(inputPath, outputPath)
    }
  }
}

// 使用示例：处理public/posts目录下的md文件，输出到public/processed_posts
await processDirectory(
  path.join(__dirname, '../public/posts'),
  path.join(__dirname, '../public/processed_posts')
)
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

// 获取当前模块路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置路径
const POSTS_DIR = path.join(__dirname, '../public/posts')
const OUTPUT_FILE = path.join(__dirname, '../public/data/posts.json')

// 读取所有Markdown文件
const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'))

// 提取Frontmatter数据
const posts = files.map(file => {
  const filePath = path.join(POSTS_DIR, file)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(fileContent)
  
  // 确保有必需的字段
  if (!data.id) data.id = path.parse(file).name.replace('id', '')
  if (!data.link) data.link = `/blog/${data.id}`
  
  return data
})

// 按日期排序
posts.sort((a, b) => new Date(b.date) - new Date(a.date))

// 写入JSON文件
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2))
console.log(`成功生成 ${posts.length} 篇文章索引到 ${OUTPUT_FILE}`)
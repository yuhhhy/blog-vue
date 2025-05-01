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

let count = 0; // 用于给每个文件生成唯一的ID
// 提取Frontmatter数据
const posts = files.map(file => {
  const filePath = path.join(POSTS_DIR, file)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  
  // 确保有必需的id和link字段
  if (!data.id) data.id = count++;
  if (!data.link) data.link = `/blog/${data.id}`
  // 字数统计
  if (!data.wordCount){
    let iTotal = 0; // 汉字数
    let eTotal = 0; // 字母数
    let wTotal = 0; // 英文单词数
    let nTotal = 0; // 数字数
    let sTotal = 0; // 空格数
    let oTotal = 0; // 其他字符数
    let str = content;
    for (let i = 0; i < str.length; i++) {
      let c = str.charAt(i);
      if (/^[\u4e00-\u9fcb]$/.test(c)) { // 匹配中文字符
        iTotal++;
      } else if (/^[a-zA-Z]$/.test(c)) { // 匹配英文字符
        eTotal++;
      } else if (/^[0-9]$/.test(c)) { // 匹配数字
        nTotal++;
      } else if (/^\s$/.test(c)) { // 匹配空白符
        sTotal++;
      } else { // 匹配标点和其他字符
        oTotal++;
      }
    }
    wTotal = str.split(/\s+/).filter(word => word.match(/^[a-zA-Z]+$/)).length
    data.wordCount = str.length - eTotal + wTotal - sTotal
  } 
  return data
})

// 按日期排序
posts.sort((a, b) => new Date(b.date) - new Date(a.date))

// 写入JSON文件
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2))
console.log(`成功生成 ${posts.length} 篇文章索引到 ${OUTPUT_FILE}`)
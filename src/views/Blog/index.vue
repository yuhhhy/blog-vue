<script setup>
import MarkdownIt from 'markdown-it'
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor"
import Sidebar from '@/components/Sidebar/index.vue'
import ArticleHeader from './components/ArticleHeader.vue'
import ArticleContent from './components/ArticleContent.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
let content = ref('') // markdown格式文章内容
let htmlContent = ref('') // html格式文章内容
let blogData = ref({}) // data/posts.json
let tocHtml = ref('') // toc生成的html

// 获取当前路由博客的相关数据blogData
const searchBlogList = async (blogId) => {
    const response = await fetch('/data/posts.json')
    const blogList = await response.json()
    const blog = blogList.find(item => item.id === blogId)
    
    if (!blog) {
      router.push('/404')
      return
    }
    return blog
}

// 获取文章内容htmlContent
const fetchBlogContent = async () => {
  const response = await fetch(`/processed_posts/${blogData.value.title}.md`)
  content.value = await response.text()

  // 生成文章Toc
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  }).use(markdownItTocAndAnchor, {
    tocCallback: function(tocMarkdown, tocArray, tocHtmlResult) {
      tocHtml.value = tocHtmlResult
    }
  })
  htmlContent.value = md.render(content.value)
}


onMounted(async () => {
  const blogId = parseInt(route.params.id)
  blogData.value = await searchBlogList(blogId)
  await fetchBlogContent()
})
</script>

<template>
    <div class="blog-container">
        <!-- 博客头部banner区域 -->
        <div class="blog-header">
            <div class="banner" :style="{ backgroundImage: `url(${blogData.coverImage})` }"></div>
            <!-- 遮罩层 -->
            <div class="mask"></div>
            <!-- 相关信息 -->
            <div class="blog-title">{{ blogData.title }}</div>
            <div class="blog-info">
                <div class="blog-date">{{ blogData.date }}</div>
                <div class="blog-author">作者 {{ blogData.author }}</div>
                <div class="blog-word-count">字数 {{ blogData.wordCount }}</div>
            </div>
        </div>

        <!-- 除了头部banner的主体和侧边栏区域 -->
        <div class="blog-main">
            <!-- 博客页面文章主体 -->
            <div class="blog-aritcle">
                <!-- 文章上部分交互区域 -->
                <ArticleHeader></ArticleHeader>
                <!-- 文章主体内容区域 -->
                <ArticleContent :htmlContent="htmlContent"></ArticleContent>
                <!-- 文章底部相关信息和评论区域 -->
                <!-- <ArticleFooter></ArticleFooter> -->
            </div>

            <!-- 博客页面右侧边栏 -->
            <div class="blog-sidebar">
                <Sidebar :tags="blogData.tags" :tocHtml="tocHtml"></Sidebar>
            </div>
        </div>
    </div>
</template>

<style module>
img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 20px 0;
}
</style>

<style lang="scss" scoped>
.blog-container {
    background-color: var(--light);
    margin-top: 64px;
    min-height: calc(100vh - 75px);
    width: 100%;

    .blog-header {
        position: relative;
        color: #fff;

        .banner {
            width: 100%;
            height: 500px;
            background-attachment: fixed;
            background-size: cover;
        }

        .mask {
            width: 100%;
            height: 500px;
            background: linear-gradient(transparent, rgba(0,0,0,0.4) 50%, rgba(0, 0, 0, 0.8));
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .blog-title {
            font-size: 3.125rem;
            font-weight: bold;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 120px;
            text-align: center;
            width: 80%;
        }
        .blog-info {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            width: 100%;
            position: absolute;
            bottom: 20px;

            > div {
                height: 30px;
                line-height: 30px;
            }
        }
    }

    .blog-main {
        padding: 40px calc(7vw + 10px);
        display: flex;
        height: 100%;
        .blog-aritcle {
            flex: 1;
            background-color: var(--white);
            border-radius: 15px;
        }
        .blog-sidebar {
            width: 300px;
            min-width: 260px;
            height: auto; // 高度自适应
            min-height: 100%; // 撑开.blog-sidebar
            display: flex;
            flex-direction: column;
        }
    }
}

@media screen and (max-width: 768px) {
    .blog-container {
        background-color: var(--white);
        .blog-header {
            .banner {
                height: 200px;
            }
            .mask {
                height: 200px;
            }
            .blog-title {
                font-size: 1.875rem;
                bottom: 80px;
            }
            .blog-info {
                bottom: 10px;
                > div {
                    height: 20px;
                    line-height: 20px;
                }
                
            }
        }
        .blog-main {
            padding: 0;
            flex-direction: column;
            .blog-aritcle {
                border-radius: 0;
                margin-right: 0;
                margin-bottom: 20px;
            }
            .blog-sidebar {
                display: none;
            }
        }
    }
}
</style>
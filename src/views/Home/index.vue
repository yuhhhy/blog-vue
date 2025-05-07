<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '@/components/Sidebar/index.vue'

const blogList = ref([])

onMounted(async () => {
  const response = await fetch('/data/posts.json')
  blogList.value = await response.json()
})
</script>

<template>
    <div class="home-container">
        <!-- banner -->
        <div class="home-banner">
            <span>少说漂亮话，多做平凡事。</span>
        </div>
        <div class="home-content">
            <!-- 博客列表 -->
            <div class="home-main">
                <RouterLink 
                    v-for="blog in blogList" 
                    :to="`/blog/${blog.id}`" 
                    class="blog"
                >
                    <div class="blog-img"
                        :style="{ 'background-image': `url(${ blog.coverImage})` }">
                    </div>
                    <div class="blog-intro">

                        <div class="blog-title">{{ blog.title }}</div>
                        <div class="blog-time-tags">
                            <span class="blog-time">{{ blog.date.substring(0, 10) }}</span>
                            <span class="blog-tag" v-for="tag in blog.tags">{{ tag }}</span>
                        </div>
                    </div>
                </RouterLink>
            </div>
            <!-- 个人展示 -->
            <Sidebar></Sidebar>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home-container {
    display: flex;
    flex-direction: column;
    margin-top: 64px;
    min-height: calc(100vh - 75px);

    .home-banner {
        width: 100%;
        height: 400px;
        background: linear-gradient(to top, #B1EAFB, #4158d0);
        // background: linear-gradient(135deg, #c850c0, #4158d0);
        color: #FFF;
        font-size: 4rem;
        font-weight: 700;
        font-family: "Google Sans", arial, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;  // 文字居中
        @media (max-width: 768px) {
            height: 200px;
            font-size: 2rem;
        }
    }

    .home-content{
        background-color: var(--light);
        padding: 40px 60px;
        display: flex;
        @media (max-width: 768px) {
            padding: 20px 20px;
        }
    
        .home-main {
            flex: 1;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
    
            .blog {
                flex: 1;
                border-radius: 10px;
                overflow: hidden;
                background-color: var(--white);
                min-width: 400px;
                &:hover {
                    box-shadow: 0 0 10px var(--lake);
                    transition: 0.4s;
                }

                @media (max-width: 768px) {
                    min-width: 100%;
                }
    
                .blog-img {
                    width: 100%;
                    height: 200px;
                    background-size: cover;
                    background-position: center;
                }
    
                .blog-intro {
                    padding: 0 20px;
                    color: var(--black);
                    .blog-time-tags {
                        color: var(--quote-color);
                        font-size: 0.875rem;
                        margin-bottom: 6px;
                        .blog-time {
                            margin-right: 10px;
                        }
                        .blog-tag {
                            padding-right: 10px;
                            &::before {
                                content: '# ';
                            }
                        }
                    }
                    .blog-title {
                        font-size: 1.125rem;
                        font-weight: bold;
                        margin-bottom: 6px;
                        margin-top: 10px;
                        @media (max-width: 768px) {
                            font-size: 1rem;
                        }
                    }
                }
            }
        }
    }
}
</style>

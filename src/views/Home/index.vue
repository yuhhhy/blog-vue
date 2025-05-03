<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Sidebar from '@/components/Sidebar/index.vue'

const textParts = ref([
  { left: "内容", middle: "形式", right:"重要" },
  { left: "做到", middle: "说到", right:"困难" }
])
const currentIndex = ref(0)
let intervalId = null
const blogList = ref([])


onMounted(async () => {
  const response = await fetch('/data/posts.json')
  blogList.value = await response.json()

  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % textParts.value.length
  }, 5000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
    <div class="home-container">
        <!-- banner -->
        <div class="home-banner">
            <div class="animated-text">
                <transition name="slide" mode="out-in">
                    <span :key="currentIndex" class="text-part">{{ textParts[currentIndex].left }}</span>
                </transition><span>比</span><transition name="slide" mode="out-in">
                    <span :key="currentIndex" class="text-part">{{ textParts[currentIndex].middle }}</span>
                </transition><span>更</span><transition name="slide" mode="out-in">
                    <span :key="currentIndex" class="text-part">{{ textParts[currentIndex].right }}</span>
                </transition>
            </div>
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
            .text-part {
                margin: 0 -20px;
            }
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.home-banner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.text-part {
    display: inline-block;
    min-width: 100px;
    text-align: center;
}
.slide-enter-active {
    animation: slideIn 0.5s ease-out;
}
.slide-leave-active {
    animation: slideOut 0.5s ease-out;
}

@keyframes slideIn {
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-30px);
        opacity: 0;
    }
}
</style>

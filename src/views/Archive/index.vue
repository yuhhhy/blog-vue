<script setup>
import Sidebar from '@/components/Sidebar/index.vue'
import TagList from './components/TagList.vue';
import { ref } from 'vue'

const posts = ref([])

fetch('/data/posts.json').then(response => response.json()).then(posts => {
    posts.value = posts;
})

</script>

<template>
<div class="archive-container">
    <div class="archive-main">
        <!-- 归档页面文章列表 -->
        <div class="archive-list">
            <!-- 归档页面标签列表 -->
            <TagList :posts="posts"></TagList>
            <!-- 路由决定不同排序方式 -->
            <RouterView></RouterView>
        </div>
        <!-- 归档页面侧边栏 -->
        <Sidebar></Sidebar>
    </div>
</div>
</template>

<style lang="scss" scoped>
.archive-container {
    background-color: var(--light);
    color: var(--black);
    margin-top: 64px;
    min-height: calc(100vh - 75px);
    
    .archive-main {
        padding: 40px calc(7vw + 10px);
        display: flex;
        height: 100%;
        .archive-list {
            flex: 1;
            background-color: var(--white);
            border-radius: 15px;
            padding: 20px 0;
        }
    }
}
@media (max-width: 768px) {
    .archive-container{
        background-color: var(--white);
        .archive-main {
            padding: 20px 10px;
            .archive-list{
                padding: 0;
                flex-direction: column;
                .archive-list {
                    margin-right: 0;
                    margin-bottom: 20px;
                    border-radius: 0;
                }
            }
        }
    }
}
</style>
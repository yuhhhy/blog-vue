<script setup>
import Sidebar from '@/components/Sidebar/index.vue'
</script>

<template>
<div class="archive-container">
    <div class="archive-main">
        <!-- 归档页面文章列表 -->
        <div class="archive-list">
            <!-- 不同排序方式 -->
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
        }
        @media (max-width: 768px) {
                padding: 0;
                flex-direction: column;
            .archive-list {
                    margin-right: 0;
                    margin-bottom: 20px;
            }
        }
    }
}
</style>
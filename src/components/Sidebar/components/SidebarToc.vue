<script setup>
defineProps({
    tocHtml: { // 文章目录html
        type: String,
        default: ''
    },
})
</script>

<template>
    <!-- toc: Table of Content 文章目录 -->
    <div class="toc">
        <div class="toc-header">文章目录</div>
        <div class="toc-content" v-html="tocHtml"></div>
    </div>
</template>

<style lang="scss" scoped>
.toc {
    background-color: var(--white);
    color: var(--dark);
    height: fit-content;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 10px;
    position: sticky;
    top: 84px; // 必须指定top/left/right/bottom值

    &:hover {
        box-shadow: 0 0 6px var(--cyan);
    }

    .toc-header {
        padding-left: 20px;
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .toc-content {
        color: var(--skyblue);
        font-size: 0.9rem;
        line-height: 1.5;
    }
    :deep(ul), :deep(ol) {
        padding-left: 2em;
        margin: 0.3em 0;
        
        li {
            margin-bottom: 0.6em;
            list-style-position: outside;
            list-style: none;
        }
    }
}


</style>
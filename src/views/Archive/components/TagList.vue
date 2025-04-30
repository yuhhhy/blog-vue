<script setup>
import { ref, onMounted } from 'vue'
const posts = ref([])
const tags = ref([])

onMounted(async () => {
    const response = await fetch('/data/posts.json')
    posts.value = await response.json()

    tags.value = [...new Set(
        posts.value.flatMap(post => post.tags)
    )]

})
</script>

<template>
<div class="archive-tags">
    <RouterLink 
        v-for="tag in tags" 
        :key="tag" 
        :to="`/archive/${tag}`"
        >
        <span class="tag">
            <span class="iconfont">&#xe920;</span>
            {{ tag }}
        </span>
    </RouterLink>
</div>
</template>

<style lang="scss" scoped>
.archive-tags {
    padding: 10px 40px;
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;

    .tag {
        color: var(--white);
        background-color: var(--blue);
        border-radius: 5px;
        cursor: pointer; // 鼠标悬停时显示指针
        margin: 30px 10px;
        padding: 5px 10px;
        
        .iconfont {
            font-size: 12px;
            margin-right: 5px;
       }
    }
}
</style>
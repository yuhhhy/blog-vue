<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const postsDividedByMonth = ref({})

// 获取当前活跃的月份，用于动态样式高亮显示
const activeMonth = computed(() => {
  return route.params.tagName
})

onMounted(async () => {
    const response = await fetch('/data/posts.json')
    const posts = await response.json()
    // 按月份分组
    postsDividedByMonth.value = posts.reduce((acc, post) => {
        const date = post.date.split('-').slice(0, 2).join('-')
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(post)
        return acc
    }, {})
})
</script>

<template>
    <div class="sidebar-archive">
        <RouterLink 
            v-for="(posts, date) in postsDividedByMonth" 
            :key="date" 
            :to="`/archive/${date}`"
        >
            <div class="archive-month" :class="{ active: date === activeMonth }">
                <div class="date">{{ date.split('-')[0] }}年 {{ date.split('-')[1] }}月</div>
                <div class="number">{{ posts.length }}篇</div>
            </div>
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
.sidebar-archive {
    font-family: var(--font-serif);
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: var(--white);
    width: 100%;
    padding: 16px 20px;
    overflow: hidden;

    .archive-month {
        cursor: pointer;
        height: 50px;
        width: 100%;
        padding-left: 10px;
        position: relative;
        display: flex;
        align-items: center;

        .number {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 14px;
            color: var(--quote-color);
        }

        &:hover {
            background-color: var(--light);
        }
    
        &.active {
            background-color: var(--blue);
            color: white;
            border-radius: 4px;
            
            .number {
                color: white;
            }
        }
    }
}
</style>
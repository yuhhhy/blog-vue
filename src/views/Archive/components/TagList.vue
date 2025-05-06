<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const posts = ref([])
const tags = ref([])
const props = defineProps(['posts'])
console.log("taglist",props.posts)

// 获取当前活跃标签
const activeTag = computed(() => {
  return route.params.tagName
})

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
        <span class="tag" :class="{ active: tag === activeTag }">
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

    @media screen and (max-width: 768px) {
        padding: 0;
    }

    .tag {
        border: 2px dashed var(--cyan);
        color: var(--cyan);
        border-radius: 5px;
        cursor: pointer;
        margin: 30px 10px;
        padding: 5px 10px;
        
        .iconfont {
            font-size: 12px;
            margin-right: 5px;
       }
        
        &.active {
            background-color: var(--cyan);
            color: var(--white);
            box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }
    }
}
</style>
<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const postsByDate = ref([])
const postsByTag = ref([])

onMounted(async () => {
    const response = await fetch('/data/posts.json')
    postsByDate.value = await response.json()

    // 是否需要根据标签进行筛选
    if(route.params.tagName){
      postsByTag.value = postsByDate.value.filter(post => {
          return post.tags.includes(route.params.tagName)
      })
    }
})
</script>

<template>
  <div class="container">
    <el-timeline style="max-width: 600px" class="timeline">
      <el-timeline-item 
        v-if="route.params" 
        v-for="item in postsByTag" 
        :timestamp="item.date" 
        type="primary" 
        class="timeline-item"
      >
        <RouterLink :to="item.link" class="timeline-item__link">    
          <span  class="timeline-item__title">{{ item.title }}</span>
        </RouterLink>
      </el-timeline-item>
      <el-timeline-item 
        v-else 
        v-for="item in postsByDate" 
        :timestamp="item.date" 
        type="primary" 
        class="timeline-item"
      >
        <RouterLink :to="item.link" class="timeline-item__link">    
          <span  class="timeline-item__title">{{ item.title }}</span>
        </RouterLink>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style lang="scss" scoped>
.container {
    padding-left: 40px;
    padding-top: 50px;

    :deep(.timeline-item__title){
        font-size: 1rem;

    }
}
</style>
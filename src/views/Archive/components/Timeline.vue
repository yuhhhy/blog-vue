<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const postsByDate = ref([])
const postsByTag = ref([])

// 提取筛选逻辑为单独函数
const filterPostsByTag = () => {
  // 参数为日期，匹配精确到月份
  if(route.params.tagName.match(/^\d{4}-\d{2}$/)){
    postsByTag.value = postsByDate.value.filter(post => {
      return post.date.startsWith(route.params.tagName)
    })
  }else{ // 参数为Tag，匹配Tag
    postsByTag.value = postsByDate.value.filter(post => {
      return post.tags.includes(route.params.tagName)
    })
  }
}

// 页面挂载
onMounted(async () => {

  const response = await fetch('/data/posts.json')
  postsByDate.value = await response.json()

  if(route.params.tagName){
    filterPostsByTag()
  }
})

// 当前页面切换Tag
watch(() => route.params.tagName, () => {
  filterPostsByTag()
})
</script>

<template>
  <div class="container">
    <el-timeline style="max-wipx" class="timeline">
      <!-- 有路由参数时显示 -->
      <el-timeline-item 
        v-if="route.params.tagName" 
        v-for="item in postsByTag" 
        :timestamp="item.date" 
        type="primary" 
        class="timeline-item"
      >
        <RouterLink :to="item.link" class="timeline-item__link">    
          <span  class="timeline-item__title">{{ item.title }}</span>
        </RouterLink>
      </el-timeline-item>

      <!-- 无路由参数时显示 -->
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
    :deep(.el-timeline-item__node){
      background-color: var(--cyan);
      border-color: var(--cyan);
    }

    @media screen and (max-width: 768px)  {
      padding-top: 40px;
      padding-left: 20px;
    }
}
</style>
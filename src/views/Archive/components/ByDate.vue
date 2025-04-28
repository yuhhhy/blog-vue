<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const postsByDate = ref([])

onMounted(async () => {
    const response = await fetch('/data/posts.json')
    postsByDate.value = await response.json()
})
</script>

<template>
  <div class="container">
    <el-timeline style="max-width: 600px" class="timeline">
      <el-timeline-item v-for="item in postsByDate" :timestamp="item.date" type="primary" class="timeline-item">
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
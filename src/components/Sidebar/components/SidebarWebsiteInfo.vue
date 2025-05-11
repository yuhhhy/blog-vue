<script setup>
import { ref, onMounted } from 'vue'

// 网站运行天数
const runTime = ref(getrunTime('2025-05-04'))
function getrunTime(startTime) {
    let date1 = new Date(startTime)
    let date2 = new Date()
    const diff = date2.getTime() - date1.getTime()
    const diffDate =  Math.round(diff / (24 * 60 * 60 * 1000))
    return diffDate
}

// 网站文章总数
const totalPosts = ref(0)
onMounted(() => {
    fetch('/data/posts.json')
    .then(response => response.json())
    .then(data => {
        totalPosts.value = data.length
    })
})

// 网站访问量

</script>

<template>
  <div class="website-info">
    <div class="website-info-header">网站资讯</div>
    <div class="website-stats">
      <div class="stat-item">
        <span class="stat-value">{{ runTime }}</span>
        <span class="stat-label">运行天数</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ totalPosts }}</span>
        <span class="stat-label">文章总数</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">100</span>
        <span class="stat-label">访问量</span>
      </div>
    </div>
    <div class="last-updated">最后更新: 2025-05-11</div>
  </div>
</template>

<style lang="scss" scoped>
.website-info {
  background-color: var(--white);
  color: var(--dark);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  &:hover {
    box-shadow: 0 0 6px var(--lake);
    transition: 0.4s;
  }

  .website-info-header {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .website-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: space-between;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 80px;

      .stat-value {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--blue);
      }

      .stat-label {
        font-size: 0.8rem;
        color: var(--quote-color);
      }
    }
  }

  .last-updated {
    font-size: 0.8rem;
    color: var(--quote-color);
    text-align: center;
    margin-top: 10px;
  }
}
</style>
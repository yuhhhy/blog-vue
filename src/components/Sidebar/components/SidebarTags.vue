<script setup>
import Tag from '@/components/Tag/index.vue'
import tagList from '@/data/tagList.js'

</script>

<template>
    <div class="sidebar-tags">
        <Tag v-for="tag in tagList" :tag="tag"></Tag>
    </div>
</template>

<style lang="scss" scoped>
.sidebar-tags {
    background-color: #FFF;
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;           
}
</style>
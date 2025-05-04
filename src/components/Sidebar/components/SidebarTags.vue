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
    background-color: var(--white);
    color: var(--black);
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    &:hover {
        box-shadow: 0 0 10px var(--orange);
        transition: 0.4s;
    }
}
</style>
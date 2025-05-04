<script setup>
import Tag from '@/components/Tag/index.vue'
import tagList from '@/data/tagList.js'
</script>

<template>
    <div class="sidebar-tags">
        <div class="sidebar-tags-title">⇨ 我的技能 ⇦</div>
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
    padding: 10px;
    &:hover {
        box-shadow: 0 0 10px var(--orange);
        transition: 0.4s;
    }
    .sidebar-tags-title {
        color: var(--orange);
        font-family: var(--font-sans);
        font-weight: bold;
        font-size: 1.1rem;
        margin-left: 20px;
        margin-bottom: 20px;
        margin-top: 10px;
    }
}
</style>
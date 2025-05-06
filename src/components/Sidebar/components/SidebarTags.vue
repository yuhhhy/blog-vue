<script setup>
import Tag from '@/components/Tag/index.vue'
import tagList from '@/data/tagList.js'
</script>

<template>
    <div class="sidebar-tags">
        <div class="sidebar-tags-title">我的技能</div>
        <Tag v-for="tag in tagList" :tag="tag"></Tag>
    </div>
</template>

<style lang="scss" scoped>
.sidebar-tags {
    background-color: var(--white);
    color: var(--black);
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    padding: 10px;
    &:hover {
        box-shadow: 0 0 6px var(--cyan);
        transition: 0.4s;
    }
    .sidebar-tags-title {
        font-weight: bold;
        font-size: 1.2rem;
        margin-left: 10px;
        margin-bottom: 20px;
        margin-top: 10px;
    }
}
</style>
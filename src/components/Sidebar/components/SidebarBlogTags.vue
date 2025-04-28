<script setup>
    defineProps(['tags'])
</script>

<template>
    <div class="blog-tags">
        <span class="tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
    </div>
</template>

<style lang="scss" scoped>
.blog-tags {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;

    .tag {
        padding: 5px 10px;
        &::before {
            content: '# ';
        }
    }
}
</style>
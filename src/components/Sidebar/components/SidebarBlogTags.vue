<script setup>
    defineProps(['tags'])
</script>

<template>
    <div class="blog-tags">
        <div class="blog-tags-header">文章标签</div>
        <RouterLink 
            v-for="tag in tags" 
            :key="tag" 
            :to="`/archive/${tag}`">
            <span class="tag" >{{ tag }}</span>
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
.blog-tags {
    background-color: var(--white);
    color: var(--dark);
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
    &:hover {
        box-shadow: 0 0 6px var(--gold);
        transition: 0.4s;
    }
    .blog-tags-header{
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 10px;
        width: 100%;
    }

    .tag {
        color: var(--quote-color);
        border-radius: 5px;
        padding: 5px 10px;
        &::before {
            content: '# ';
        }
        &:hover {
            background-color: var(--orange);
            color: white;
        }
    }
}
</style>
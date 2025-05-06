<script setup>
import SidebarAuthor from './components/SidebarAuthor.vue';
import SidebarArchive from './components/SidebarArchive.vue';
import SidebarTags from './components/SidebarTags.vue';
import SidebarToc from './components/SidebarToc.vue';
import SidebarBlogTags from './components/SidebarBlogTags.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const props = defineProps(['tags','tocHtml'])

// 根据路由动态加载组件
const currentComponent = computed(() => {
    if (route.path.startsWith('/blog/')) {
        return [
            { component: SidebarArchive },
            { component: SidebarBlogTags, props: { tags: props.tags } },
            { component: SidebarToc, props: { tocHtml: props.tocHtml } }
        ];
    } else {
        return [
            { component: SidebarAuthor },
            { component: SidebarArchive },
            { component: SidebarTags }
        ];
    }
})
</script>

<template>
    <div class="sidebar">
        <component 
            v-for="(item, index) in currentComponent"
            :is="item.component"
            :key="index"
            v-bind="item.props || {}"
            class="sidebar-item"
        />
    </div>
</template>

<style lang="scss" scoped>
.sidebar {
    font-family: var(--font-serif);
    display: flex;
    flex-direction: column;
    width: 300px;
    min-width: 280px;
    height: 100%;
    margin-left: 40px;

    .sidebar-item:not(:last-child) {
        margin-bottom: 20px;
    }
}
@media (max-width: 768px){
    .sidebar {
        display: none;
    }
}
</style>
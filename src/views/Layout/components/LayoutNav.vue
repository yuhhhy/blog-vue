<script setup>
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
</script>

<template>
    <div class="nav" :class="{ unshow: y >= 64 }">
        <div class="nav-links">
            <RouterLink to="/home">主页</RouterLink>
            <RouterLink to="/archive">归档</RouterLink>
            <RouterLink to="/about">关于</RouterLink>
        </div>
    </div>
    <!-- 回到顶部 -->
    <el-backtop :right="16" :bottom="100" style="color: var(--white); background-color: rgba(88, 183, 255, 0.8)" />
</template>
<style lang="scss" scoped>
.nav {
    background-color: var(--white);
    width: 100%;
    height: 64px;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    .nav-links {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        gap: 50px;
    }

    a {
        color: var(--dark);

        &:hover {
            color: var(--blue);
        }
        &.active {
            color: var(--blue);
        }
    }
}
.unshow {
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 0.3s ease-in-out;
}
</style>

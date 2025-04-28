<script setup>
</script>

<template>
    <div class="nav">
        <div class="nav-links">
            <RouterLink to="/home">主页</RouterLink>
            <RouterLink to="/archive">归档</RouterLink>
            <RouterLink to="/about">关于</RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.nav {
    background-color: rgba(255, 255, 255, 0.9);
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
</style>

<script setup>
import { useWindowScroll } from '@vueuse/core'
import { ref } from 'vue'

const { y } = useWindowScroll()
const darkMode = ref(false)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark', darkMode.value)
}
</script>

<template>
    <div class="nav" :class="{ unshow: y >= 64 }">
        <div class="nav-links">
            <RouterLink to="/home">主页</RouterLink>
            <RouterLink to="/archive">归档</RouterLink>
            <RouterLink to="/about">关于</RouterLink>
        </div>
        <button @click="toggleDarkMode" class="theme-toggle">
            <span class="iconfont themeIcon" v-if="!darkMode">&#xe886;</span>
            <span class="iconfont themeIcon" v-else style="color: #fff;">&#xea26;</span>
        </button>
        <div class="el-drop-down">
            <el-dropdown placement="top-start">
                <span class="iconfont">&#xe61b;</span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item><RouterLink to="/home">主页</RouterLink></el-dropdown-item>
                        <el-dropdown-item><RouterLink to="/archive">归档</RouterLink></el-dropdown-item>
                        <el-dropdown-item><RouterLink to="/about">关于</RouterLink></el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
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
        display: none;
        @media (min-width: 768px) {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            gap: 50px;
        }
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

    .el-drop-down {
        display: none;
        @media (max-width: 768px) {
            display: block;
            position: absolute;
            top: 22px;
            left: 30px;
        }

        .iconfont {
            font-size: 15px;
        }
    }
    .themeIcon {
        position: absolute;
        top: 22px;
        right: 30px;
    }
}
.unshow {
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 0.3s ease-in-out;
}

.theme-toggle {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0 10px;
}
</style>

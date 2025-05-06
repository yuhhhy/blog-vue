<script setup>
import { useThemeStore } from '@/stores/themeStore.js';

const themeStore = useThemeStore();
</script>

<template>
    <div class="sidebar-author">
        <div class="author-avatar">
            <img src="@/assets/images/avatar_compress.jpg" alt="my avatar">
        </div>
        <span id="author-name">一曝十寒</span>
        <div id="author-words">
            <p>你好！我是 <span style="color: var(--cyan); font-weight: 800;">一曝十寒</span></p>
            <p>欢迎来到我的博客</p>
        </div>
        <div class="author-social">
            <a href="https://github.com/yuhhhy" target="_blank">
                <svg v-if="themeStore.theme === 'light'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#181717" viewBox="0 0 24 24"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#e7e8e8" viewBox="0 0 24 24"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
            </a>
            <a href="https://space.bilibili.com/76781252" target="_blank">
                <svg t="1616318385527" class="icon" viewBox="0 40 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="729" width="23" height="23"><title>Bilibili</title><path d="M306.005333 117.632L444.330667 256h135.296l138.368-138.325333a42.666667 42.666667 0 0 1 60.373333 60.373333L700.330667 256H789.333333A149.333333 149.333333 0 0 1 938.666667 405.333333v341.333334a149.333333 149.333333 0 0 1-149.333334 149.333333h-554.666666A149.333333 149.333333 0 0 1 85.333333 746.666667v-341.333334A149.333333 149.333333 0 0 1 234.666667 256h88.96L245.632 177.962667a42.666667 42.666667 0 0 1 60.373333-60.373334zM789.333333 341.333333h-554.666666a64 64 0 0 0-63.701334 57.856L170.666667 405.333333v341.333334a64 64 0 0 0 57.856 63.701333L234.666667 810.666667h554.666666a64 64 0 0 0 63.701334-57.856L853.333333 746.666667v-341.333334A64 64 0 0 0 789.333333 341.333333zM341.333333 469.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666666-42.666667z m341.333334 0a42.666667 42.666667 0 0 1 42.666666 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333333 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z" p-id="730" fill="#00AEEC"></path></svg>
            </a>
            <a href="https://juejin.cn/user/3798140261765715/posts" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 22"><title>掘金</title><path fill="#2985fc" d="m12 14.316l7.454-5.88l-2.022-1.625L12 11.1l-.004.003l-5.432-4.288l-2.02 1.624l7.452 5.88Zm0-7.247l2.89-2.298L12 2.453l-.004-.005l-2.884 2.318l2.884 2.3Zm0 11.266l-.005.002l-9.975-7.87L0 12.088l.194.156l11.803 9.308l7.463-5.885L24 12.085l-2.023-1.624Z"></path></svg>
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sidebar-author {
    background-color: var(--white);
    color: var(--light-dark);
    min-height: 300px;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    &:hover {
        box-shadow: 0 0 6px var(--grape);
        transition: 0.4s;
    }

    .author-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 5px var(--grape);

        &:hover {
            transform: scale(1.05);
            transition: 0.4s;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

    #author-name {
        font-weight: bold;
        margin: -10px 0 -20px 0;
    }

    #author-words {
        text-align: center;
        max-width: 100%;
        word-wrap: break-word; // 长单词断行

        p {
            margin-top: .5rem;
        }
    }

    .author-social {
        display: flex;
        gap: 30px;

        a:hover {
            transform: scale(1.2);
            transition: 0.1s;
        }
    }
}
</style>
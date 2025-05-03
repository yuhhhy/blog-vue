<script setup>
import Sidebar from "@/components/Sidebar/index.vue"
import ArticleContent from "../Blog/components/ArticleContent.vue";

const htmlContent = `
            <h1>关于我</h1>
            <ul>
                <li>大二生，来自江西，正在长沙上学</li>
                <li>喜欢听音乐🎵、Vocaloid🎹，会弹一点点吉他🎸，研究一点作曲🎼</li>
                <li>喜欢跑步🏃、打羽毛球🏸</li>
                <li>喜欢买很多书📚，然而并没有读多少</li>
                <li>了解一些政治、历史知识，读过一点马经📕，喜欢关注社会新闻📰</li>
                <li>喜欢的电影：《寄生虫》、《攻壳机动队》、《千年女优》</li>
                <li>喜欢的一些书：《局外人》、《变形记》、刘慈欣的全部小说...</li>
                <li>喜欢的番剧：《It's MyGO!!!!!》、《瑞克和莫蒂》、《铃音》、《Just Because!》</li>
                <li>玩过的一些游戏：决战平安京、Battlefield 5、CS2</li>
                <li>正在看漫画：《火之鸟》</li>
                <li>...</li>
            </ul>`
</script>

<template>
    <div class="about">
        <div class="about-article">
            <ArticleContent :htmlContent="htmlContent"></ArticleContent>
        </div>
        <Sidebar class="about-sidebar"></Sidebar>
    </div>
</template>

<style lang="scss" scoped>
.about {
    min-height: calc(100vh - 75px);
    background-color: var(--light);
    margin-top: 64px;
    padding: 40px calc(7vw + 10px);
    display: flex;

    .about-article {
        background-color: var(--white);
        border-radius: 10px;
        flex: 1;
    }
    @media (max-width: 768px) {
            padding: 0;
            flex-direction: column;
           .about-aritcle {
                margin-right: 0;
                margin-bottom: 20px;
           }
        }
}
</style>

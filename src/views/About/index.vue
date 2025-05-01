<script setup>
import Sidebar from "@/components/Sidebar/index.vue"
import ArticleContent from "../Blog/components/ArticleContent.vue";

const htmlContent = `
            <h1>## 关于我</h1>
            <p>嘿，欢迎来到这里</p>
            <ul>
                <li>中南大学在读，大二生</li>
                <li>喜欢听音乐、Vocaloid，会弹一点点吉他，研究一点作曲</li>
                <li>喜欢跑步、打羽毛球</li>
                <li>喜欢买很多书，然而并没有读多少</li>
                <li>了解一些政治、历史知识，读过一点马经，喜欢关注社会新闻</li>
                <li>看过的一些电影：《列宁在十月》、《高山下的花环》、《寄生虫》、《小偷家族》、《千年女优》</li>
                <li>玩过的一些游戏：决战平安京、战地五、CS2</li>
                <li>看过的一些书：《理想国》、《三国演义》、《变形记》、刘慈欣的全部小说...</li>
                <li>看过的番剧：《Lain》、《MyGo》、《无职转生》、《Rick and Morty》、《龙与虎》、SSSS系列、《Just Because!》、《月色真美》</li>
                <li>正在看漫画：《火之鸟》...</li>
                <li>老家是江西的，喜欢吃热腾腾的烫粉</li>
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
    background-color: var(--light);
    margin-top: 64px;
    padding: 40px calc(7vw + 10px);
    display: flex;
    height: 100%;

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

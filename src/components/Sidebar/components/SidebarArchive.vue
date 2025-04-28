<script setup>
// 归档相关代码
</script>

<template>
    <div class="sidebar-archive">
            <a href="#">
                <div class="archive-month first">
                    <div class="date">2025 四月</div>
                    <div class="number">1篇</div>
                </div>
            </a>
            <a href="#">
                <div class="archive-month">
                    <div class="date">2025 五月</div>
                    <div class="number">1篇</div>
                </div>
            </a>
    </div>
</template>

<style lang="scss" scoped>
.sidebar-archive {
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: #fdfdfd;
    width: 100%;
    padding: 16px 20px;
    overflow: hidden;

    .archive-month {
        cursor: pointer;
        height: 50px;
        width: 100%;
        padding-left: 10px;
        position: relative;
        display: flex;
        align-items: center;
        border-top: 1px solid #b5b5b5;

        .number {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 14px;
            color: #666;
        }

        &.first {
            border-top: none;
        }

        &:hover {
            background-color: #eee;
        }
    }
}
</style>
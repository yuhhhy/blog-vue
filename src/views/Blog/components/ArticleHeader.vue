<script setup>
defineProps(['blogData'])

</script>

<template>
<div class="article-header">
    <div class="header-left">
        <div class="view-count">
            <span>阅读 {{ 10 }}</span>
            <!-- <span>{{ blogData.views || 10 }} 阅读</span> -->
        </div>
    </div>
    <div class="header-right">
        <div class="action-btn like">
            <div class="iconfont">&#xe707;</div>
            <span>{{ 2 }}</span>
            <!-- <span>{{ blogData.likes || 2 }}</span> -->
        </div>
        <div class="action-btn comment">
            <div class="iconfont">&#xe613;</div>
            <span>{{ 3 }}</span>
            <!-- <span>{{ blogData.comments || 3 }}</span> -->
        </div>
        <div class="action-btn share">
            <div class="iconfont">&#xe65a;</div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.article-header {
    padding: 10px 20px 5px 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    background: var(--white);
    border-radius: 8px 8px 0 0;

    .header-left {
        display: flex;
        align-items: center;
        
        .view-count {
            font-size: 0.875rem;
            color: var(--quote-color);
        }
    }
    
    .header-right {
        display: flex;
        margin-left: auto;
        gap: 20px;

        .action-btn {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.875rem;
            color: var(--quote-color);
            cursor: pointer;
            transition: all 0.3s;

            .iconfont {
                font-size: 18px;
            }
            
            &.like {
                .iconfont {
                    font-size: 20px !important;  // 保持span图标大小不变
                }
            }
            &.like:hover {
                color: var(--red);
            }
            &.comment:hover {
                color: var(--blue);
            }
            &.share:hover {
                color: var(--orange);
            }
        }
    }
}
</style>
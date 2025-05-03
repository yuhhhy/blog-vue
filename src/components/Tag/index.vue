<script setup>
const props = defineProps({
    tag: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <RouterLink to="#">
        <div class="tag">
             <!-- 用v-html把{{ '&#xe632;' }}变成{{ &#xe632; }} -->
            <div class="iconfont tag-img" style="font-size: 38.5px;" v-html="props.tag.tagImg"></div>
            <div class="tag-info">
                <div class="tag-info-left">
                    <div class="tag-name">{{ tag.tagName }}</div>
                    <div class="tag-process">
                        <div class="tag-process-hours">{{ tag.tagHours }} h</div>
                        <div class="tag-process-bar">
                            <el-progress 
                                :percentage="tag.tagProgress" 
                                :text-inside="true" 
                                :stroke-width="5" 
                                :show-text="false"
                                :color="tag.progressColor"
                            />
                        </div>
                    </div>
                </div>
                <div class="tag-info-right">
                    <div class="tag-achievements">{{ tag.tagNumber }}</div>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<style lang="scss" scoped>
.tag {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    position: relative;
    font-size: 0.875rem;

    &:hover {
        .tag-img {
            transform: translateX(115px);
            transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
                
        }
        .tag-info {
            transform: translateX(115px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .black-box {
            transform: translateX(115px);
            transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
    }
    .tag-img {
        height: 55%;
        width: 38.5px;
        border-radius: 4px;
        object-fit: cover;  // 保持图片比例
    }
    .tag-info {
        flex: 1;
        height: 100%;
        display: flex;
        padding-left: 10px;
        border-bottom: 1px solid #F5F5FA;

        .tag-info-left {
            flex: 1;
            margin-left: 10px;
            flex-basis: 90px;
            display: flex;
            flex-direction: column;
            padding-right: 40px;

            .tag-name {
                margin-top: 6px;
                height: 1.2em;
                font-weight: 700;
            }
            .tag-process {
                flex: 1;
                .tag-process-hours {
                    height: 60%;
                    display: flex;
                    align-items: end;
                    margin-bottom: 5px;
                    font-size: 0.8rem;
                }
                .tag-process-bar {
                    height: 40%;
                }
            }
        }

        .tag-info-right {
            position: relative;

            .tag-achievements {
                position: absolute;
                right: 8px;
                bottom: 4px;
                font-size: 15px;
            }
        }
    }

}
</style>
<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="footer-info">
        <div class="left-footer">
                <p>© 2025 一曝十寒. All rights reserved.</p>
        </div>
        <div class="right-footer">
            <RouterLink to="/about"><span>关于</span></RouterLink>
            <RouterLink to="/archive"><span>归档</span></RouterLink>
            <span id="contact">联系</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.footer-info {
    background-color: var(--white);
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    z-index: 999;
    font-size: 0.875rem;

    .right-footer {
        display: flex;
        gap: 50px;
        white-space: nowrap;
        span:hover  {
            color: var(--blue);
        }
        #contact {
            cursor: pointer;
        }
    }
    
}
@media (max-width: 768px) {
    .footer-info{
        border-top: 1px solid var(--border-color);
        padding: 0 20px;
        .right-footer{
            gap: 15px;
            padding: 0;
            white-space: nowrap;
        }
    }
}
</style>
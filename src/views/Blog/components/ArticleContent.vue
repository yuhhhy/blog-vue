<script setup>
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import '@/assets/font/prism-comment.scss'
import { onUpdated } from 'vue'

defineProps(['htmlContent'])

onUpdated(() => {
    document.querySelectorAll('pre code').forEach((block) => {
        Prism.highlightElement(block)
    })
})
</script>

<template>
    <div class="article-content">
        <div v-html="htmlContent" class="markdown-content"></div>
    </div>
</template>

<!-- 这个不能加scoped，因为是全局的html样式 -->
<style lang="scss">
.article-content {
    padding: 0 30px;
    line-height: 1.8;
    padding-bottom: 50px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: var(--light-dark);

    .markdown-content {
        position: relative;

        h1 {
            font-size: 2em;
        }
        h2 {
            font-size: 1.8em;
        }
        h3 {
            font-size: 1.6em;
        } 
        h4 {
            font-size: 1.4em;
        }
        h5 {
            font-size: 1.2em;
        }
        h6 {
            font-size: 1em;
        }
        h1, h2, h3, h4, h5, h6  {
            color: var(--sapphire);
            margin: 1.5em 0 0.8em;
            font-weight: 600;

            a {
                display: none;
            }
            &:hover {
                a {
                    display: inline;
                }
            }
        }

        p {
            margin-bottom: 1.2em;
            font-size: 1rem;
        }

        p[align="center"] {
            font-size: 0.8rem;
            color: var(--quote-color);
        }

        ul, ol {
            padding-left: 2em;
            margin: 1em 0;
            
            li {
                margin-bottom: 0.6em;
                list-style-position: outside;
            }
        }

        a {
            color: var(--skyblue);
            text-decoration: none;
            word-break: break-word;  // 文字折行
            &:hover {
                text-decoration: underline;
            }
        }

        code {
            background: var(--code-background-inline);
            color: var(--code-inline);
            padding: 0.2em 0.4em;
            border-radius: 3px;
            text-shadow: none;

            span {
                background: none;
                padding: 0;
                border-radius: 0;

                &.token.number {
                    color: #357cef;
                }
                &.token.keyword {
                    color: #6ba3d3;
                }
                &.token.function {
                    color: #C678DD;
                }
                &.token.punctuation {
                    color: #aaa;
                }
                &.token.string {
                    color: #50a14f;
                }
            }
        }

        pre {
            background: var(--code-background);
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;

            code {
                color: var(--code-color);
                background: none;
                padding: 0;
                border-radius: 0;
            }
        }

        blockquote {
            border-left: 3px solid var(--quote-color);
            padding-left: 1em;
            color: var(--quote-color);
            margin: 1em 0;
            font-style: italic;
        }
    }
}
@media (max-width: 768px) {
    .article-content {
        padding-bottom: 30px;
        padding-left: 15px;
        padding-right: 15px;
        .markdown-content {
            h1, h2, h3, h4 {
                font-size: 20px;
            }
            p, ul, ol, li, code, pre, blockquote { 
                font-size: 14px;
            }
        }

    }
}

</style>
<template>
    <div class="footer flex column al-ct jc-ct">
        <div class="copyright">
            <a href="http://www.it-fly.cn//" rel="noreferrer"
               target="_blank"> 四川仕虹腾飞信息技术有限公司</a>
            <lb-icon type="fa-copyright"/>
            2021 - 版权所有
        </div>
    </div>
</template>

<script>
    export default {
        name: 'layoutFooter',
        data() {
            return {}
        }
    }
</script>

<style lang="less" scoped>
    .footer {
        font-size: 85%;

        & > div:not(:last-child) {
            margin-bottom: 10px;
        }

        .info {
            * {
                color: rgba(0, 0, 0, 0.45);

                &:not(:last-child) {
                    margin-right: 10px;
                }
            }

            a {
                &:hover {
                    color: rgba(0, 0, 0, 0.65);
                }
            }
        }

        .links {
            a {
                color: rgba(0, 0, 0, 0.45);

                &:hover {
                    color: rgba(0, 0, 0, 0.65);
                }

                &:not(:last-child) {
                    margin-right: 40px;
                }
            }
        }

        .copyright {
            color: rgba(0, 0, 0, 0.45);

            a {
                color: rgba(0, 0, 0, 0.45);

                &:hover {
                    color: rgba(0, 0, 0, 0.65);
                }
            }
        }
    }
</style>

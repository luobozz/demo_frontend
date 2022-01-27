<template>
    <div class="lb-notification flex column" :style="{'margin-bottom':`${bottom}px`}" v-if="show" >
        <div class="message mg-b-min">{{message}}</div>
        <div class="description mg-b-min" v-html="description"></div>
        <a-icon class="icon" type="close" @click="show=false"></a-icon>
        <div class="btn flex jc-fe al-ct">
            <a-button-group>
                <a-button v-for="(b,i) in btn" :key="i"  @click="show=false,b.click()" :type="b.type||'primary'" :size="b.size">
                    {{b.text}}
                </a-button>
            </a-button-group>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'notification',
        data() {
            return {}
        },
        props: {
            message:{
                type:String,
                default:""
            },
            description:{
                type:String,
                default:""
            },
            show:{
                type:Boolean,
                default:false
            },
            btn:{
                type:Array,
                default:()=>{
                    return [];
                }
            },
            bottom:{
                type:Number,
                default:20
            }
        },
        computed: {

        },
        watch: {

        },
        created() {
        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style lang="less"  scoped>
    .lb-notification{
        position: relative;
        background-color: @color-bg-base;
        box-shadow: @shadow-2;
        width: 100%;
        padding:@padding-md;
        &>div{

        }
        &>.message{
            font-size: @font-size-lg;
        }
        &>.description{
            line-height: 1.5;
        }
        &>.icon{
            position: absolute;
            right: @padding-sm;
            top:@padding-sm;
        }
    }
</style>

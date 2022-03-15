<template>
    <div class="content">
      <a-result status="500" title="500" :sub-title="currentPattern.title">
        <template #extra>
          <a-button v-for="(btn,i) in currentPattern.btns" :key="i" @click="btn.handle()" :type="btn.type||'primary'">
            {{ btn.title }}
          </a-button>
        </template>
      </a-result>
    </div>
</template>

<script>
    import methods from "./500";

    export default {
        name: "error404",
        data() {
            return {
              currentPatternIndex:"default",
              patterns:{
                default:{
                  title:"出错了",
                  btns:[]
                },
                quit:{
                  title:"",
                  btns:[
                    {
                      title:"返回登录",
                      handle:()=>{}
                    }
                  ]
                }
              }
            }
        },
        created() {
          console.log(this.$router.getParams())
        },
        computed: {
          currentPattern(){
            return this.patterns[this.currentPatternIndex]
          }
        },
        methods: methods
    }
</script>

<style lang="less" scoped>
    @import "./500.less";
</style>
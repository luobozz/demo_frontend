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
        name: "error500",
        data() {
            return {
              currentPatternIndex:"default",
              patterns:{
                default:{
                  title:"出错了",
                  btns:[]
                },
                logout:{
                  title:"",
                  btns:[
                    {
                      title:"返回登录",
                      handle:()=>{
                        this.logout()
                      }
                    }
                  ]
                }
              }
            }
        },
        created() {
          // console.log(this.$route)
          this.currentPatternIndex=this.$router.getParams().pattern||"default"
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
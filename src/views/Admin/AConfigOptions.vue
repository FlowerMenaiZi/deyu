<template>
  <div id="ACOContent">
    <AdminNav :endHeight="endHeight" :NavContent="NavContent"/>
    <div :style="{height:endHeight+'px'}" class="ACOContent">
        <h1>待开发....</h1>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, getCurrentInstance, inject, onBeforeMount, reactive} from 'vue'
  import AdminNav from '@/components/AdminNav.vue'
  import {useRoute} from "vue-router";
  import router from "@/router";
  import {message} from "ant-design-vue";

  export default defineComponent({
    name: "AConfigOptions",
    components: {
      AdminNav
    },
    setup() {
      const endHeight = inject('endHeight')
      const {proxy}:any = getCurrentInstance();
      const route = useRoute()
      const tokenData = route.params.token
      onBeforeMount(async ()=>{
        await proxy.$api.get(
          "/checkToken",
          {},
          {"tokenName":"login","tokenData":tokenData},
          (success) => {

          },
          (error) => {
            if(error.data==="认证失败"){
              message.error('会话过期请重新登录')
              router.push("/109in")
            }
          }
        )
      })
      const NavContent = reactive([
        {
          key:1,
          text:'录入分数',
          isSelect:false,
          path:'/8222021519/'+tokenData
        },{
          key:2,
          text:'修改分数',
          isSelect:false,
          path:'/9022021520/'+tokenData
        },{
          key:3,
          text:'确认录入',
          isSelect:false,
          path:'/9222021521/'+tokenData
        },{
          key:4,
          text:'配置选项',
          isSelect:true,
          path:'/10032021522/'+tokenData
        },
      ])


      return {
        endHeight,
        NavContent
      }
    }
  })
</script>

<style scoped>
  #ACOContent {
    display: flex;
  }

  .ACOContent {
    width: 100%;
    padding: 10px 10px 0 10px;
  }
</style>
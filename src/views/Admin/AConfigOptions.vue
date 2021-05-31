<template>
  <div id="ACOContent">
    <AdminNav :endHeight="endHeight" :NavContent="NavContent"/>
    <div :style="{height:endHeight+'px'}" class="ACOContent">
      <h2>系统配置：</h2>
      <div class="options">
        <div>
          <label>
            开学日期：
            <input type="text" placeholder="如：2021-9-1" v-model="startSchool">
          </label>
        </div>
        <div>
          <label>
            学期添加：
            <input type="text" placeholder="如：2021-2022上学期" v-model="semester">
          </label>
        </div>
        <div>
          <label>
            学期标识：
            <input type="text" placeholder="如：2021-2022t" v-model="semesterId">
          </label>
        </div>
        <div>
          <label>
            超级管理员密码：
            <input type="password" v-model="password">
          </label>
        </div>
        <div class="submit">
          <a-button type="primary" @click="putToUpdate">提交</a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, getCurrentInstance, inject, onBeforeMount, reactive,ref} from 'vue'
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
      const {proxy}: any = getCurrentInstance();
      const route = useRoute()
      const tokenData = route.params.token
      onBeforeMount(async () => {
        await proxy.$api.get(
          "/checkToken",
          {},
          {"tokenName": "login", "tokenData": tokenData},
          (success) => {

          },
          (error) => {
            if (error.data === "认证失败") {
              message.error('会话过期请重新登录')
              localStorage.removeItem('login')
              router.push("/109in")
            }
          }
        )
      })
      const NavContent = reactive([
        {
          key: 1,
          text: '录入分数',
          isSelect: false,
          path: '/8222021519/' + tokenData
        }, {
          key: 2,
          text: '修改分数',
          isSelect: false,
          path: '/9022021520/' + tokenData
        }, {
          key: 3,
          text: '确认录入',
          isSelect: false,
          path: '/9222021521/' + tokenData
        }, {
          key: 4,
          text: '配置选项',
          isSelect: true,
          path: '/10032021522/' + tokenData
        },
      ])

      const startSchool = ref('')
      const semester = ref('')
      const semesterId = ref('')
      const password = ref('')
      const putToUpdate = () =>{
        if (semester.value || semesterId.value || startSchool.value){
          if (semester.value && semesterId.value && startSchool.value){
            if (!password.value){
              message.warn('请填写密码')
              return false
            }else{

            }
          }else{
            message.warn('开学日期、学期添加、学期标识、密码不得为空')
            return false
          }
        }else{
          message.warn('开学日期、学期添加、学期标识、密码不得为空')
          return false
        }
      }

      return {
        endHeight,
        NavContent,
        putToUpdate,
        startSchool,
        semester,
        semesterId,
        password
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
  .options div{
    margin-bottom: 15px;
  }
  .options input {
    width: 250px;
    height: 30px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all .4s ease-in-out;
    outline: none;
    text-indent: 1rem;
  }
  .options input[type="password"]{
    width: 208px;
  }

  .options input:hover {
    border: 1px solid #40a9ff;
    transition: all .4s ease-in-out;
  }

  .options input:focus {
    box-shadow: 0 0 2px 2px #bce3ff;
    border: 1px solid #40a9ff;
  }
</style>
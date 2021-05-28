<template>
  <div id="login" :style="{height:endHeight+'px'}">
    <div class="block">
      <h2>登录</h2>
      <div class="username">
        <label>账号：</label>
        <input type="text" placeholder="请输入账号" v-model="username">
      </div>
      <div class="password">
        <label>密码：</label>
        <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="checkLogin">
      </div>
      <div class="btn">
        <input @click="checkLogin" type="button" value="登录"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, getCurrentInstance, inject, ref,onBeforeMount} from 'vue'
  import router from "@/router";
  import {message} from "ant-design-vue";

  export default defineComponent({
    name: "Login",
    setup() {
      const endHeight = inject('endHeight')
      const username = ref('')
      const password = ref('')
      const {proxy}: any = getCurrentInstance();
      const checkLogin = () => {
        proxy.$api.post(
          '/checkLogin',
          {},
          {'user': username.value, 'pass': password.value},
          (success) => {
            message.success('欢迎回来')
            setTimeout(() => {
              router.push('/8222021519/'+success.data.token)
              localStorage.setItem('login',success.data.token)
            }, 1000)
          },
          (failure) => {
            message.error('账号或者密码错误')
          }
        )
      }
      onBeforeMount(()=>{
        let temToken = localStorage.getItem('login')
        if (temToken){
          router.push('/8222021519/'+temToken)
        }
      })
      return {
        endHeight,
        username,
        password,
        checkLogin
      }
    }
  })
</script>

<style scoped>
  #login {
    position: relative;
    width: 100%;
  }

  #login .block {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 70px 0 0 0;
  }

  #login .block h2 {
    text-align: center;
    margin: 20px 0;
  }

  #login .block div {
    margin: 0 0 20px 0;
    text-align: center;
  }

  #login .block div input[type=text], #login .block div input[type=password] {
    border: 1px solid #00a7d0;
    outline: none;
    text-indent: 1em;
    width: 180px;
    height: 30px;
  }

  #login .block div input[type=button] {
    z-index: 1;
    color: white;
    background: #40a9ff;
    outline: none;
    border: none;
    width: 80px;
    height: 30px;
  }

  #login .block div input[type=button]:hover {
    cursor: pointer;
    animation: jelly 0.5s;
  }

  @keyframes jelly {
    0%,
    100% {
      transform: scale(1, 1);
    }

    25%,
    75% {
      transform: scale(0.9, 1.1);
    }

    50% {
      transform: scale(1.1, 0.9);
    }
  }
</style>
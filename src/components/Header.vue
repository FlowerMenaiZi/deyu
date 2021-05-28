<template>
  <div id="header">
    <div class="content">
      <div class="logo">
        <router-link to="/home"><img src="@/assets/logo.png" alt=""></router-link>
      </div>
      <div class="famous">
        <!--        <p>大声道你家顺口溜的缴纳快乐暑假打了开始就爱说就打开了</p>-->
        <p>{{famous}}——{{author}}</p>
      </div>
      <div class="options">
        <ul v-show="showNav">
          <li>
            <select name="witch" id="sel" @change="jump1($event)">
              <option value="/home">请选择</option>
              <option :value="item.path" v-for="(item,index) in selItem" :key="item.key" :selected="item.isSelect">
                {{item.name}}
              </option>
            </select>
          </li>
          <li>
            <div class="login">
              <router-link to="/109in">
                <img src="@/assets/flower.png" alt="登录" title="登录">
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref, watch, computed, getCurrentInstance, onMounted} from 'vue'
  import {useRoute} from "vue-router";

  export default defineComponent({
    name: "Header",
    props: {
      selItem: {
        type: Object
      },
      jumpTo: {
        type: Function,
        required: true
      }
    },
    setup(props) {
      const route = useRoute()
      const hidArr: string [] = ['/back', '/semester', '/l0gin', '/8222021519', '/9022021520', '/9222021521', '/10032021522']
      let showNav = ref(true)
      watch(() => route.path, (path) => {
        if (hidArr.indexOf(path) !== -1) {
          showNav.value = false
        } else {
          showNav.value = true
        }
        props.jumpTo(path)
      })
      const isSelect = computed((path) => {
        return route.path === path
      })
      const jump1 = (e: any) => {
        props.jumpTo(e.target.value)
      }

      //获取名句API
      const famous = ref('')
      const author = ref('')
      const {proxy}: any = getCurrentInstance();
      onMounted(() => {
        proxy.$api.get(
          '/txapi/mingyan/index',
          {},
          {'key': '9269070fbd6878795832583bba8b7f66'},
          (success) => {
            famous.value = success.data.newslist[0].content
            author.value = success.data.newslist[0].author
          },
          (failure) => {
            famous.value = '发生了错误！QAQ'
          },
          'http://api.tianapi.com'
          )

      })

      return {
        jump1,
        showNav,
        isSelect,
        famous,
        author
      }
    }
  })
</script>

<style scoped>
  #header {
    width: 100%;
    height: 60px;
    background-color: #f6f6f6;
  }

  #header .content {
    height: 100%;
    width: 61%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #header .content .logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
  }

  #header .content .logo img {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 805px) {
    #header .content .famous {
      display: none;
    }
  }

  #header .content .famous p {
    margin: 0;
  }

  #header .content .options ul {
    display: flex;
    align-items: center;
    margin: 0;
  }

  #header .content .options ul li #sel {
    width: 120px;
    height: 30px;
    border: none;
    text-align: center;
    text-align-last: center;
    outline: none;
    margin-right: 20px;
    background: radial-gradient(circle at center center, rgba(25, 25, 112, 0), rgba(25, 25, 112, 0)),
    linear-gradient(rgba(229, 112, 238, 0.62), rgba(179, 224, 255, 0.62)) left top,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left top,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right top,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right top,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left bottom,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) left bottom,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right bottom,
    linear-gradient(rgba(179, 224, 255, 0.62), rgba(179, 224, 255, 0.62)) right bottom,
    linear-gradient(rgba(56, 144, 184, 0.60), rgba(56, 144, 184, 0.60)) top,
    linear-gradient(rgba(26, 87, 130, 0.60), rgba(26, 87, 130, 0.60)) bottom,
    linear-gradient(rgba(56, 144, 184, 0.60), rgba(219, 240, 255, 0.80), rgba(26, 87, 130, 0.60)) left,
    linear-gradient(rgba(56, 144, 184, 0.60), rgba(219, 240, 255, 0.80), rgba(26, 87, 130, 0.60)) right;
    background-repeat: no-repeat;
    background-position: 1px 1px, 0px 0px, 0px 0px, 0px 100%, 0px 100%, 100% 0px, 100% 0px, 100% 100%, 100% 100%, 0px 0px, 0px 100%, 0px 100%, 100% 100%;
    background-size: calc(100% - 2px) calc(100% - 2px), 1px 10px, 10px 1px, 1px 10px, 10px 1px, 1px 10px, 10px 1px, 1px 10px, 10px 1px, 100% 1px, 100% 1px, 1px 100%, 1px 100%;
  }

  #header .content .options ul li .login {
    width: 50px;
    height: 50px;
  }

  #header .content .options ul li .login img {
    width: 100%;
    height: 100%;
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transition: all ease 1s;
    -webkit-transition: all ease 1s;
  }

  #header .content .options ul li .login img:hover {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transition: all ease 1s;
    -webkit-transition: all ease 1s;
  }
</style>
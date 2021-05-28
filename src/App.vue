<template>
  <Header :selItem="selItem" :jumpTo="jumpTo"></Header>
  <router-view></router-view>
  <Footer class="footer"></Footer>
</template>
<script lang="ts">
  import {customRef, defineComponent, provide, reactive, ref, onMounted, toRefs, watch} from 'vue'
  import * as echarts from 'echarts'

  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue"
  import router from "@/router";
  import {SELM} from "@/types/SELM"
  import {saveSelItem, readSelItem} from "@/utils/localStorageUtils";


  export default defineComponent({
    name: "App",
    components: {
      Header,
      Footer
    },
    setup() {
      //生成echarts
      provide('ec', echarts)

      const selOption = reactive<{ selItem: SELM[] }>({
        selItem: []
      })

      onMounted(() => {
        selOption.selItem = readSelItem('selItem_key')
        if (selOption.selItem.length == 0){
          saveSelItem([
            {
              key: 1,
              name: '每日',
              path: '/day',
              isSelect: false
            },
            {
              key: 2,
              name: '每周',
              path: '/week',
              isSelect: false
            },
            {
              key: 3,
              name: '每月',
              path: '/month',
              isSelect: false
            },
            {
              key: 4,
              name: '分类',
              path: '/part',
              isSelect: false
            }
          ],'selItem_key')
          selOption.selItem = readSelItem('selItem_key')
        }
      })

      //判断是否为浏览器关闭而不是刷新
      var _beforeUnload_time = 0,_gap_time=0;
      window.onunload = function () {
        _gap_time=new Date().getTime()-_beforeUnload_time;
        if (_gap_time<=2){
          localStorage.removeItem('selItem_key')
          localStorage.removeItem('login')
        }
      }
      window.onbeforeunload=function(){
        _beforeUnload_time=new Date().getTime();
      }


      const jumpTo = (path: string) => {
        router.push(path)
        for (let item of selOption.selItem) {
          if (item.path === path) {
            item.isSelect = true
          } else {
            item.isSelect = false
          }
        }
      }
      watch(() => selOption.selItem, function () {
        saveSelItem(selOption.selItem,'selItem_key')
      }, {deep: true})


      const updateWH = (WHeight: number) => {
        return customRef((track, trigger) => {
          return {
            get() {
              track()
              return WHeight;
            },
            set(newHeight: number) {
              WHeight = newHeight
              trigger()
            }
          }
        })
      }
      let windowHeight = updateWH(document.documentElement.clientHeight)
      const endHeight = ref(windowHeight.value - 60 - 30)
      window.onresize = (e: any) => {
        windowHeight = updateWH(e.target.innerHeight)
        endHeight.value = windowHeight.value - 60 - 30
      }
      provide('endHeight', endHeight)
      return {
        ...toRefs(selOption),
        jumpTo,
        endHeight
      }
    }
  })
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
  }

  body, html {
    height: 100%;
    width: 100%;
  }
</style>
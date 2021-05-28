<template>
  <div class="container">
    <div :style="{height:blockHeight+'px'}" class="day">
      <router-link to="/day">
        <p :style="{lineHeight:blockHeight+'px'}">每日</p>
      </router-link>
    </div>
    <div :style="{height:blockHeight+'px'}" class="day">
      <router-link to="/week">
        <p :style="{lineHeight:blockHeight+'px'}">每周</p>
      </router-link>
    </div>
    <div :style="{height:blockHeight+'px'}" class="day">
      <router-link to="/month">
        <p :style="{lineHeight:blockHeight+'px'}">每月</p>
      </router-link>
    </div>
    <div :style="{height:blockHeight+'px'}" class="day">
      <router-link to="/part">
        <p :style="{lineHeight:blockHeight+'px'}">分类</p>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent,inject} from 'vue'

  export default defineComponent({
    name: "Home",
    setup() {
      //获取高度
      const blockHeight = inject('endHeight')

      return {
        blockHeight
      }
    }
  })
</script>

<style scoped>
  .container {
    width: 1170px;
    margin: 0 auto;
    display: flex;
  }

  .day {
    width: 290px;
    background: #FFAB36;
    transform: skewX(-10deg);
    overflow: hidden;
  }
  .day a{
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #fff;
  }
  .day a p{
    text-align: center;
    font-size: 5rem;
    transition: all .5s ease-in-out;
  }
  .day a p:hover{
    transform: scale(1.2);
    transition: all .5s ease-in-out;
  }
  @media screen and (max-width: 1285px){
    .container {
      width: 870px;
    }
    .day a p{
      font-size: 3.5rem;
    }
  }
  @media screen and (max-width: 1005px){
    .container {
      width: 670px;
    }
    .day a p{
      font-size: 3rem;
    }
  }
  @media screen and (max-width: 805px){
    .container {
      width: 360px;
    }
    .day a p{
      font-size:2rem;
    }
  }
</style>
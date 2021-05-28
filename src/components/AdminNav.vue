<template>
  <div :style="{height:endHeight+'px'}" id="ANav">
    <ul>
      <li v-for="(item,index) in NavContent" :key="item.key">
        <p :style="{width:item.isSelect?'100%':''}">
          <router-link :to="{path:item.path}">
            {{item.text}}
          </router-link>
        </p>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: "AdminNav",
    props: {
      endHeight: {
        type: Number,
        required: true
      },
      NavContent: {
        type: Object,
        required: true
      }
    },
    setup() {
      return {}
    }
  })
</script>

<style scoped>
  #ANav {
    width: 15rem;
    background: #e5e5e5;
  }

  #ANav ul {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 100px 0 0 0;
  }

  #ANav ul li {
    width: 100%;
    cursor: pointer;
    height: 50px;
    margin-top: 10px;
  }


  #ANav ul li p {
    width: 90%;
    height: 100%;
    line-height: 50px;
    background: white;
    text-align: center;
    margin: 0 auto;
    transition: all .1s ease-in-out;
  }

  #ANav ul li p:hover {
    width: 100%;
    transition: all .1s ease-in-out;
  }
  #ANav ul li p a {
    color: #333;
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
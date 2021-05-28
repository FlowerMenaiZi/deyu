<template>
  <div id="NotFound" :style="{height:endHeight+'px'}">
    <img src="@/assets/very_sorry.png" alt="">
    <div>
      <button @click="goBack" id="btn">返回上一页</button>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent,inject} from 'vue'
  import router from "@/router";

  export default defineComponent({
    name: "404",
    setup() {
      const endHeight = inject('endHeight')
      const goBack = () =>{
        router.back()
      }
      return {
        endHeight,
        goBack
      }
    }
  })
</script>

<style scoped>
#NotFound{
  width: 80%;
  margin: 0 auto;
}
#NotFound {
  text-align: center;
}
#btn {
  z-index: 1;
  color: white;
  background: #40a9ff;
  outline: none;
  border: none;
  padding: 0.5em 1em;
  width: 100px;
  height: 40px;
}

#btn:hover {
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
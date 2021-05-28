<template>
  <div id="MContent">
    <div class="son">
      <MonthPointMost/>
    </div>
    <div class="son">
      <MonthPersonBrokenAll/>
    </div>
    <div class="son">
      <MonthItemPro/>
    </div>
    <div class="son">
      <MonthDormPro/>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue'
  import MonthPointMost from "@/components/MonthPointMost.vue";
  import MonthDormPro from "@/components/MonthDormPro.vue";
  import MonthItemPro from "@/components/MonthItemPro.vue";
  import MonthPersonBrokenAll from "@/components/MonthPersonBrokenAll.vue"
  export default defineComponent({
    name: "Month",
    components:{
      MonthPointMost,
      MonthDormPro,
      MonthItemPro,
      MonthPersonBrokenAll,
    },
    setup() {
      return {}
    }
  })
</script>

<style scoped>
  #MContent{
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  #MContent .son{
    width: 580px;
    height: 350px;
    background: #FFAB36;
    margin: 30px 0;
    padding: 20px 0 0 10px;
  }
</style>
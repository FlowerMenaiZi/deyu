<template>
  <div id="content">
    <div class="son">
      <WeekPointMost/>
    </div>
    <div class="son">
      <WeekPersonScore/>
    </div>
    <div class="son">
      <WeekItemPro/>
    </div>
    <div class="son">
      <WeekPersonBroken/>
    </div>
    <div class="son">
      <WeekPersonBrokenAll/>
    </div>
    <div class="son">
      <WeekDormPro/>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue'
  import WeekPointMost from "@/components/WeekPointMost.vue";
  import WeekPersonScore from "@/components/WeekPersonScore.vue"
  import WeekItemPro from "@/components/WeekItemPro.vue"
  import WeekPersonBroken from "@/components/WeekPersonBroken.vue";
  import WeekPersonBrokenAll from "@/components/WeekPersonBrokenAll.vue";
  import WeekDormPro from "@/components/WeekDormPro.vue";

  export default defineComponent({
    name: "Week",
    components:{
      WeekPointMost,
      WeekPersonScore,
      WeekItemPro,
      WeekPersonBroken,
      WeekDormPro,
      WeekPersonBrokenAll
    },
    setup() {
      return {

      }
    }
  })
</script>

<style scoped>
 #content{
   width: 90%;
   margin: 20px auto;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
 }
 #content .son{
   width: 450px;
   height: 300px;
   background: #FFAB36;
   margin: 40px 0;
   padding: 20px 0 0 25px;
 }
</style>
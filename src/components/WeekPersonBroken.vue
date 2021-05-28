<template>
  <div id="WPBEcharts" @mouseenter="clearTimeId" @mouseleave="startTimeId">

  </div>
</template>
<script lang="ts">
  import {defineComponent, getCurrentInstance, inject, onMounted, reactive, ref} from 'vue'

  export default defineComponent({
    name: "WeekPersonBroken",
    setup() {
      let echarts: any = inject('ec')
      let endHeight = inject('endHeight')
      let startValue = ref(0)
      let endValue = ref(4)
      let xData:any = reactive([])
      let yData:any = reactive([])
      let myChart:any = null
      const initWPB = () =>{
        myChart = echarts.init(document.getElementById('WPBEcharts'))
        myChart.setOption({
          title: {text: "本周个人得分"},
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type:'category',
            data: xData,
          },
          yAxis: {
            type:'value',
          },
          dataZoom:{
            show:false,
            startValue:startValue.value,
            endValue:endValue.value
          },
          series: [
            {
              type: "line",
              data:yData,
            },
          ]
        })
      }
      window.onresize = function () {//自适应大小
        myChart.resize();
      };
      let timerID:any = null
      const startSetInterval = () =>{
        if (timerID){
          clearInterval(timerID)
        }
        timerID = setInterval(()=>{
          startValue.value+=5
          endValue.value+=5
          if (endValue.value>=yData.length){
            startValue.value = 0
            endValue.value = 4
          }
          updateOptions()
        },2000)
      }


      const updateOptions = () =>{
        myChart.setOption({
          dataZoom: {
            startValue: startValue.value,
            endValue: endValue.value,
          },
        })
      }

      const clearTimeId = () =>{
        clearInterval(timerID)
      }
      const startTimeId = () =>{
        startSetInterval()
      }
      const {proxy}: any = getCurrentInstance();
      onMounted( () => {
         proxy.$api.get(
          "/getPersonList",
          {},
          {"semester": localStorage.getItem('semester')},
          (success) => {
            xData.splice(0, xData.length)
            yData.splice(0, yData.length)
            for (let index in success.data.data) {
              xData.push(success.data.data[index].name)
              yData.push(success.data.data[index][success.data.week])
            }
            initWPB()
            startSetInterval()
          },
          (error) => {
            console.log(error);
          }
        )
      })

      return {
        endHeight,
        clearTimeId,
        startTimeId
      }
    }
  })
</script>

<style scoped>
  #WPBEcharts {
    width: 100%;
    height: 100%;
  }
</style>
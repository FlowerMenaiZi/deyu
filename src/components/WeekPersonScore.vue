<template>
  <div id="WPSEcharts" @mouseenter="clearTimeId" @mouseleave="startTimeId">

  </div>
</template>
<script lang="ts">
  import {defineComponent, inject, onMounted, ref, reactive, getCurrentInstance} from 'vue'

  export default defineComponent({
    name: "WeekPersonScore",
    setup() {
      let startValue = ref(0)
      let endValue = ref(4)
      let xData = reactive(["罗子宏", "陈伟狄", "梁子聪", "李健华", "岑豪彬", "文健锋", "赖贤明", "梁伟鸿", "黄梓轩", "罗俊杰"])
      let yData = reactive([20, -15, 14, 10, 6, 9, -10, 5, 1, 0])
      let echarts: any = inject('ec')
      let endHeight = inject('endHeight')
      let myChart:any = null

      const initMyechart = () =>{
        myChart = echarts.init(document.getElementById('WPSEcharts'))
        myChart.setOption({
          title: {text: "个人总分柱状图"},
          tooltip: {},
          xAxis: {
            data: xData,
          },
          dataZoom: {
            startValue: startValue.value,
            endValue: endValue.value,
            show:false
          },
          yAxis: {},
          series: [
            {
              type: "bar",
              data: yData,
            },
          ]
        })
      }

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
      onMounted(() => {
        proxy.$api.get(
          "/getAllScList",
          {},
          {"semester": localStorage.getItem('semester')},
          (success) => {
            xData.splice(0, xData.length)
            yData.splice(0, yData.length)
            for (let index in success.data) {
              xData.push(success.data[index].name)
              yData.push(success.data[index].allScore)
            }
            initMyechart()
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
  #WPSEcharts {
    width: 100%;
    height: 100%;
  }
</style>
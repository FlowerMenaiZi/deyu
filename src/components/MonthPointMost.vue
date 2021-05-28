<template>
  <div id="MPMEcharts">

  </div>
</template>
<script lang="ts">
  import {defineComponent, getCurrentInstance, inject, onMounted, reactive} from 'vue'

  export default defineComponent({
    name: "MonthPointMost",
    setup() {
      let echarts: any = inject('ec')
      let endHeight = inject('endHeight')
      let myChart: any = null
      const xData: any = reactive([])
      const yData: any = reactive([])
      const initMPM = () => {
        myChart = echarts.init(document.getElementById('MPMEcharts'))
        myChart.setOption({
          title: {text: "本月扣分最多"},
          tooltip: {},
          xAxis: {
            data: xData,
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
      const {proxy}: any = getCurrentInstance();
      onMounted(() => {
        proxy.$api.get(
          "/getMonthMostList",
          {},
          {"semester": localStorage.getItem('semester')},
          (success) => {
            xData.splice(0, xData.length)
            yData.splice(0, yData.length)
            for (let index in success.data.data) {
              xData.push(success.data.data[index].name)
              yData.push(success.data.data[index][success.data.month])
            }

            initMPM()
          },
          (error) => {
            console.log(error);
          }
        )
      })

      return {
        endHeight
      }
    }
  })
</script>

<style scoped>
  #MPMEcharts {
    width: 100%;
    height: 100%;
  }
</style>
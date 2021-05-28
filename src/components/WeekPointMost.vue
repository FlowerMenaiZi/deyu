<template>
  <div id="WPMEcharts">

  </div>
</template>
<script lang="ts">
  import {defineComponent, getCurrentInstance, inject, onMounted, reactive} from 'vue'

  export default defineComponent({
    name: "WeekPointMost",
    setup() {
      let echarts: any = inject('ec')
      let endHeight = inject('endHeight')
      let myChart: any = null
      let xData: any = reactive([])
      let yData: any = reactive([])
      const initWPM = () => {
        myChart = echarts.init(document.getElementById('WPMEcharts'))
        myChart.setOption({
          title: {text: "本周扣分最多"},
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
        window.onresize = function () {//自适应大小
          myChart.resize();
        };
      }
      const {proxy}: any = getCurrentInstance();
      onMounted(async () => {
        await proxy.$api.get(
          "/getMostList",
          {},
          {"semester": localStorage.getItem('semester')},
          (success) => {
            xData.splice(0, xData.length)
            yData.splice(0, yData.length)
            for (let index in success.data.data) {
              xData.push(success.data.data[index].name)
              yData.push(success.data.data[index][success.data.week])
            }

            initWPM()
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
  #WPMEcharts {
    width: 100%;
    height: 100%;
  }
</style>
<template>
  <div id="MPBAEcharts" @mouseenter="clearTimeId" @mouseleave="startTimeId">

  </div>
</template>
<script lang="ts">
  import {defineComponent, getCurrentInstance, inject, onMounted, reactive, ref} from 'vue'

  export default defineComponent({
    name: "WeekPersonBrokenAll",
    setup() {
      let echarts: any = inject('ec')
      let endHeight = inject('endHeight')
      let xData = reactive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
      let yData:any = reactive([])
      let startStuId = ref(0)
      let endStuId = ref(1)
      let myChart: any = null
      const initMPBA = () => {
        myChart = echarts.init(document.getElementById('MPBAEcharts'))
        myChart.setOption({
          title: {text: "个人每月得分"},
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            orient: 'horizontal',
            y: 'top',
            data: [`${startStuId.value + 1}号`, `${endStuId.value + 1}号`]
          },
          xAxis: {
            type: 'category',
            data: xData,
            name: '月'
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: `${startStuId.value + 1}号`,
              type: "line",
              data: yData[startStuId.value],
              smooth: true,
            }, {
              name: `${endStuId.value + 1}号`,
              type: "line",
              data: yData[endStuId.value],
              smooth: true,
            },
          ]
        })
      }
      window.onresize = function () {//自适应大小
        myChart.resize();
      };
      let timerID: any = null
      const startSetInterval = () => {
        if (timerID) {
          clearInterval(timerID)
        }
        timerID = setInterval(() => {
          startStuId.value += 2
          endStuId.value += 2
          if (endStuId.value >= yData.length) {
            startStuId.value = 0
            endStuId.value = 1
          }
          updateOptions()
        }, 2000)
      }


      const updateOptions = () => {
        myChart.setOption({
          legend: {
            data: [`${startStuId.value + 1}号`, `${endStuId.value + 1}号`]
          },
          series: [
            {
              name: `${startStuId.value + 1}号`,
              data: yData[startStuId.value],
            }, {
              name: `${endStuId.value + 1}号`,
              data: yData[endStuId.value],
            }
          ]
        })
      }

      const clearTimeId = () => {
        clearInterval(timerID)
      }
      const startTimeId = () => {
        startSetInterval()
      }
      const {proxy}: any = getCurrentInstance();
      onMounted(() => {
        proxy.$api.get(
          "/getMonthlyList",
          {},
          {"semester": localStorage.getItem('semester')},
          (success) => {
            for (let index in success.data) {
              let arr = Object.getOwnPropertyNames(success.data[index])
              let valArr = arr.map(function (i) {
                return success.data[index][i]
              })
              yData.push(valArr)
            }

            initMPBA()
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
  #MPBAEcharts {
    width: 100%;
    height: 100%;
  }
</style>
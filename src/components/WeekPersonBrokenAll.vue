<template>
  <div id="WPBAEcharts" @mouseenter="clearTimeId" @mouseleave="startTimeId">

  </div>
</template>
<script lang="ts">
  import {defineComponent, getCurrentInstance, inject, onMounted, reactive, ref} from 'vue'

  export default defineComponent({
    name: "WeekPersonBrokenAll",
    setup() {
      let echarts: any = inject('ec')
      let endHeight = inject('endHeight')
      let startValue = ref(0)
      let endValue = ref(4)
      let xData = reactive(['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周'])
      let yData:any = reactive([])
      let startStuId = ref(0)
      let endStuId = ref(1)
      let myChart: any = null
      const initWPBA = () => {
        myChart = echarts.init(document.getElementById('WPBAEcharts'))
        myChart.setOption({
          title: {text: "个人每周得分"},
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
          if (endStuId.value >= yData.length+1) {
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
          "/getWeeklyList",
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
            initWPBA()
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
  #WPBAEcharts {
    width: 100%;
    height: 100%;
  }
</style>
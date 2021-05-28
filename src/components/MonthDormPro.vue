<template>
  <div id="MDPEcharts">

  </div>
</template>
<script lang="ts">
  import {defineComponent, getCurrentInstance, inject, onMounted, reactive} from 'vue'

  export default defineComponent({
    name: "MonthDormPro",
    setup() {
      let echarts: any = inject('ec')
      let endHeight = inject('endHeight')
      let pieData:any = reactive([])
      let myChart:any = null
      const initMDP = () =>{
        myChart = echarts.init(document.getElementById('MDPEcharts'))
        myChart.setOption({
          title:{
            text:'各宿舍本月得分占比',
          },
          series:{
            name:'各宿舍本月得分占比',
            type: "pie",
            data: pieData,
            radius:'55%',
            label:{
              show:true,
              formatter:function (arg:any) {
                // console.log(arg);
                return arg.data.name+' '+arg.data.value+'分'+'\n占比'+arg.percent+'%'
              }
            },
            selectedMode:'single'
          },
        })
      }
      window.onresize = function () {//自适应大小
        myChart.resize();
      };
      const {proxy}: any = getCurrentInstance();
      onMounted(() => {
        proxy.$api.get(
          "/getMonthDormList",
          {},
          {"semester": localStorage.getItem('semester')},
          (success) => {
            pieData.splice(0,pieData.length)
            for (let index in success.data){
              pieData.push(success.data[index])
            }
            initMDP()
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
  #MDPEcharts {
    width: 100%;
    height: 100%;
  }
</style>
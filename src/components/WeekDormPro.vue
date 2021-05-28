<template>
  <div id="WDPEcharts">

  </div>
</template>
<script lang="ts">
  import {defineComponent, getCurrentInstance, inject, onMounted, reactive} from 'vue'

  export default defineComponent({
    name: "WeekDormPro",
    setup() {
      let echarts: any = inject('ec')
      let endHeight = inject('endHeight')
      let pieData:any = reactive([])
      let myChart:any = null
      const initPie = () =>{
        myChart = echarts.init(document.getElementById('WDPEcharts'))
        myChart.setOption({
          title:{
            text:'本周各宿舍得分占比',
          },
          series:{
            name:'本周各宿舍得分占比',
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
        window.onresize = function () {//自适应大小
          myChart.resize();
        };
      }
      const {proxy}: any = getCurrentInstance();
      onMounted(() => {
        proxy.$api.get(
          "/getDormList",
          {},
          {"semester": localStorage.getItem('semester')},
          (success) => {
            pieData.splice(0,pieData.length)
            for (let index in success.data){
              pieData.push(success.data[index])
            }
            initPie()
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
  #WDPEcharts {
    width: 100%;
    height: 100%;
  }
</style>
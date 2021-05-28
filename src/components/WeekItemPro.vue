<template>
  <div id="WIPEcharts">

  </div>
</template>
<script lang="ts">
  import {defineComponent, getCurrentInstance, inject, onMounted, reactive} from 'vue'

  export default defineComponent({
    name: "WeekItemPro",
    setup() {
      let echarts: any = inject('ec')
      let endHeight = inject('endHeight')
      let pieData:any = reactive([])
      let myChart:any = null
      const initPie = () =>{
        myChart = echarts.init(document.getElementById('WIPEcharts'))
        myChart.setOption({
          title:{
            text:'本周扣分项占比',
          },
          series:{
            name:'本周扣分项占比',
            type: "pie",
            data: pieData,
            radius:'55%',
            label:{
              show:true,
              formatter:function (arg:any) {
                // console.log(arg);
                return arg.data.name+' '+arg.data.value+'次'+'\n占比'+arg.percent+'%'
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
          "/getItemList",
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
  #WIPEcharts {
    width: 100%;
    height: 100%;
  }
</style>
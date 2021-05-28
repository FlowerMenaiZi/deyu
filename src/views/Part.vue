<template>
  <div id="PContent">
    <div class="content">
      <a-table :columns="columns" :data-source="data" row-key="stuid">
        <a-pagination @change="onChange" :total="54" v-model:pageSize="pageSize"/>
      </a-table>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref, onMounted, reactive, getCurrentInstance} from 'vue'

  export default defineComponent({
    name: "Part",
    setup() {
      const columns = [
        {
          title: '学号',
          dataIndex: 'stuid',
        },{
          title: '姓名',
          dataIndex: 'name',
        },{
          title: '被子',
          dataIndex: 'quilt',
        },{
          title: '寝室',
          dataIndex: 'dorm',
        },{
          title: '课室',
          dataIndex: 'classroom',
        },{
          title: '仪表',
          dataIndex: 'meter',
        },{
          title: '纪律',
          dataIndex: 'discipline',
        },{
          title: '+/-分',
          dataIndex: 'reward',
        },
      ];
      const data:any = reactive([]);
      const pageSize = ref(10)
      const {proxy}: any = getCurrentInstance();
      onMounted(()=>{
      //  在这进行axios请求
        proxy.$api.get(
          '/getPartList',
          {},
          {'semester':localStorage.getItem('semester')},
          (success)=>{
            data.splice(0,data.length)
            for (let index in success.data){
              data.push(success.data[index])
            }
          },
          (error)=>{
            console.log(error);
          }
        )
      })
      return {
        columns,
        data,
        pageSize
      }
    }
  })
</script>

<style scoped>
  #PContent{
    width: 70%;
    margin: 30px auto;
  }
</style>
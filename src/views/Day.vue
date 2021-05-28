<template>
  <div id="day">
    <div class="content">
      <a-table :columns="columns" :data-source="data" row-key="stuId">
        <a-pagination @change="onChange" v-model:pageSize="pageSize"/>
      </a-table>
    </div>
    <div class="date">
      <a-date-picker placeholder="请选择日期" :format="dateFormat" v-model:value="value1" :disabledDate="disabledDate" :showToday="false" @change="showDate"/>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref, reactive, getCurrentInstance} from 'vue'
  import moment, { Moment } from 'moment';


  export default defineComponent({
    name: 'Day',
    setup() {
      const value1 = ref<Moment>()
      const dateFormat ="YYYY-MM-DD"
      const columns = [
        {
          title: '学号',
          dataIndex: 'stuId',
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
          title: '备注',
          dataIndex: 'dRemarks',
        },{
          title: '课室',
          dataIndex: 'classroom',
        },{
          title: '备注',
          dataIndex: 'cRemarks',
        },{
          title: '仪表',
          dataIndex: 'meter',
        },{
          title: '备注',
          dataIndex: 'mRemarks',
        },{
          title: '纪律',
          dataIndex: 'discipline',
        },{
          title: '备注',
          dataIndex: 'disRemarks',
        },{
          title: '+/-分',
          dataIndex: 'reward',
        },{
          title: '备注',
          dataIndex: 'rRemarks',
        },
      ];
      const data:any =reactive([]);
      const pageSize = ref(10)
      //禁止选择未到日期
      const disabledDate = (current:any) =>{
        return current && current > moment().endOf("day")
      }
      const {proxy}: any = getCurrentInstance();
      const showDate = (date: Moment | string, dateString: string) =>{
        proxy.$api.get(
          "getDayList",
          {},
          {'dateTime':dateString},
          (success)=>{
            data.splice(0,data.length)
            for (let item in success.data){
              data.push(success.data[item])
            }
          },
          (error)=>{
            console.log(error);
          }
        )
      }
      return {
        data,
        columns,
        value1,
        disabledDate,
        showDate,
        dateFormat,
        pageSize
      };
    }
  });
</script>

<style scoped>
#day{
  width: 70%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
#day .content{
  width:80%;
}
#day .date{
  width: 19%;
}
</style>
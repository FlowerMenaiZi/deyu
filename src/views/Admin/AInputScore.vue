<template>
  <div id="AISContent">
    <AdminNav :endHeight="endHeight" :NavContent="NavContent"/>
    <div :style="{height:endHeight+'px'}" class="AISContent">
      <table class="table" cellpadding="0" cellspacing="0">
        <tr class="header">
          <th v-for="item in column">{{item.title}}</th>
        </tr>
        <tr class="Tbody">
          <td>
            <input type="number" v-model="dormitory" required @blur="getThisName">
          </td> <!--宿舍-->
          <td style="width: 10%;">
            <a-select @change="handleChange" style="width: 80%">
              <a-select-option v-for="user in gotThisName[0]" :value="user.name" :key="user.stuId">
                {{user.name}}
              </a-select-option>
            </a-select>
          </td> <!--姓名-->
          <td>
            <input type="text" readonly style="background: #ccc;border:none !important;box-shadow: none !important;"
                   v-model="stuId">
          </td> <!--学号-->
          <td>
            <input type="number" v-model="quilt">
          </td> <!--被子-->
          <td>
            <input type="number" v-model="dorm">
          </td> <!--寝室-->
          <td>
            <input type="number" v-model="Classroom">
          </td> <!--课室-->
          <td>
            <input type="number" v-model="meter">
          </td> <!--仪表-->
          <td>
            <input type="number" v-model="discipline">
          </td> <!--纪律-->
          <td>
            <input type="number" v-model="reward">
          </td> <!--+/-分-->
          <td>
            <a-date-picker placeholder="请选择日期" :format="dateFormat" v-model:value="dateTime" :disabledDate="disabledDate" :showToday="false" @change="showDate"/>
          </td> <!--日期-->

        </tr>
      </table>
      <div class="remarks">
        <p><strong>备注：</strong></p>
        <div>
          <label>寝室：</label>
          <input type="text" v-model="DRemarks">
        </div>
        <div>
          <label>课室：</label>
          <input type="text" v-model="CRemarks">
        </div>
        <div>
          <label>仪表：</label>
          <input type="text" v-model="MRemarks">
        </div>
        <div>
          <label>纪律：</label>
          <input type="text" v-model="DisRemarks">
        </div>
        <div>
          <label>+/-分：</label>
          <input type="text" v-model="RRemarks">
        </div>
      </div>
      <div class="submit">
        <a-button type="primary" @click="putToUpdate">提交</a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, inject, reactive, ref,getCurrentInstance,onBeforeMount} from 'vue'
  import AdminNav from '@/components/AdminNav.vue'
  import {DataItem} from '@/types/AISDI'
  import {saveAISItem, readAISItem} from "@/utils/localStorageUtils";
  import {message} from 'ant-design-vue';
  import moment, { Moment } from 'moment';
  import {useRoute} from "vue-router";
  import router from "@/router";

  const column = [
    {
      title: '宿舍',
      dataIndex: '',
      slots: {customRender: 'dormitory'},
    },
    {
      title: '姓名',
      dataIndex: 'name',
      slots: {customRender: 'name'},
    },
    {
      title: '学号',
      dataIndex: 'stuId',
      slots: {customRender: 'stuId'},
    },
    {
      title: '被子',
      dataIndex: 'quilt',
      slots: {customRender: 'quilt'},
    },
    {
      title: '寝室',
      dataIndex: 'dorm',
      slots: {customRender: 'dorm'},
    },
    {
      title: '课室',
      dataIndex: 'Classroom',
      slots: {customRender: 'Classroom'},
    },
    {
      title: '仪表',
      dataIndex: 'meter',
      slots: {customRender: 'meter'},
    },
    {
      title: '纪律',
      dataIndex: 'discipline',
      slots: {customRender: 'discipline'},
    },
    {
      title: '+/-分',
      dataIndex: 'reward',
      slots: {customRender: 'reward'},
    },
    {
      title: '日期',
      dataIndex: 'date',
      slots: {customRender: 'date'},
    },
  ]
  const data: DataItem[] = [];

  export default defineComponent({
    name: "AInputScore",
    components: {
      AdminNav
    },
    setup() {
      const {proxy}:any = getCurrentInstance();
      const route = useRoute()
      const tokenData = route.params.token
      onBeforeMount(async ()=>{
        await proxy.$api.get(
          "/checkToken",
          {},
          {"tokenName":"login","tokenData":tokenData},
          (success) => {

          },
          (error) => {
            if(error.data==="认证失败"){
              message.error('会话过期请重新登录')
              localStorage.removeItem('login')
              router.push("/109in")
            }
          }
        )
      })
      const endHeight = inject('endHeight')
      const NavContent = reactive([
        {
          key: 1,
          text: '录入分数',
          isSelect: true,
          path: '/8222021519/'+tokenData
        }, {
          key: 2,
          text: '修改分数',
          isSelect: false,
          path: '/9022021520/'+tokenData
        }, {
          key: 3,
          text: '确认录入',
          isSelect: false,
          path: '/9222021521/'+tokenData
        }, {
          key: 4,
          text: '配置选项',
          isSelect: false,
          path: '/10032021522/'+tokenData
        },
      ])
      const selOption = reactive<{ dataAll: DataItem[] }>({
        dataAll: []
      })
      const dateTime = ref<string>()
      const dateFormat ="YYYY-MM-DD"
      //禁止选择未到日期
      const disabledDate = (current:any) =>{
        return current && current > moment().endOf("day")
      }

      const showDate = (date: Moment | string, dateString: string) =>{
        dateTime.value = dateString
        //  在这进行axios网络请求
      }

      //基本+扣分项目信息
      const dormitory = ref('')
      const name = ref('')
      const stuId = ref('')
      const quilt = ref('')
      const dorm = ref('')
      const Classroom = ref('')
      const meter = ref('')
      const discipline = ref('')
      const reward = ref('')

      //备注信息
      const DRemarks = ref('')
      const CRemarks = ref('')
      const MRemarks = ref('')
      const DisRemarks = ref('')
      const RRemarks = ref('')
      //提交数据
      const putToUpdate = () => {
        if (!dormitory.value) {
          message.error('宿舍不能为空')
          return false
        } else if (!dateTime.value) {
          message.error('日期不能为空')
          return false
        }
        const createItems = {
          key: new Date().getTime().toString(),
          dormitory: dormitory.value,
          name: name.value,
          stuId: parseInt(stuId.value),
          quilt: quilt.value,
          dorm: dorm.value,
          classroom: Classroom.value,
          meter: meter.value,
          discipline: discipline.value,
          reward: reward.value,
          dateTime: dateTime.value,
          dRemarks: DRemarks.value,
          cRemarks: CRemarks.value,
          mRemarks: MRemarks.value,
          disRemarks: DisRemarks.value,
          rRemarks: RRemarks.value,
        }
        const item = readAISItem('AISDI')
        for (let index in item) {
          if (item[index].stuId === createItems.stuId && item[index].dateTime === dateTime.value){
            message.info('该学生已存在记录，前往修改分数修改')
            return false
          }
        }
        if (item.length > 0) {
          for (let index in item) {
            selOption.dataAll.push(item[index])
          }
        }
        selOption.dataAll.push(createItems)
        saveAISItem(selOption.dataAll, 'AISDI')
        selOption.dataAll = []
        message.success('提交成功')
        quilt.value = ''
        dorm.value = ''
        Classroom.value = ''
        meter.value = ''
        discipline.value = ''
        reward.value = ''
        DRemarks.value = ''
        CRemarks.value = ''
        MRemarks.value = ''
        DisRemarks.value = ''
        RRemarks.value = ''
      }

      let gotThisName: any = reactive([])
      let retName: any = ''
      const getThisName = async () => {
        await proxy.$api.get(
          "/getUser",
          {},
          {},
          (success) => {
            retName = success.data
            gotThisName.splice(0,gotThisName.length)
            gotThisName.push(retName[dormitory.value])
          },
          (error) => {
            console.log(error);
          }
        )
      }

      const handleChange = async (e: any) => {
        name.value = e
        const userName = retName[dormitory.value]
        for (let obj in userName) {
          if (userName[obj].name === e) {
            stuId.value = userName[obj].stuId
          }
        }
      }


      return {
        endHeight,
        NavContent,
        column,
        dormitory,
        stuId,
        quilt,
        dorm,
        Classroom,
        meter,
        discipline,
        reward,
        putToUpdate,
        handleChange,
        getThisName,
        gotThisName,
        DRemarks,
        CRemarks,
        MRemarks,
        DisRemarks,
        RRemarks,
        dateTime,
        disabledDate,
        showDate,
        dateFormat,
      }

    }
  })
</script>

<style scoped>
  #AISContent {
    display: flex;
  }

  .AISContent {
    width: 100%;
    padding: 10px 10px 0 10px;
  }

  .table {
    width: 90%;
    margin: 0 auto;
    border: 1px solid #f0f0f0;
  }

  .table .header {
    background: #fafafa;
    height: 40px;
  }

  .table tr, td, th {
    border: 1px solid #f0f0f0;
  }

  .table th {
    text-align: center;
  }

  .table tr.Tbody {
    transition: all .4s ease-in-out;
    height: 60px;
    text-align: center;
  }

  .table tr.Tbody:hover {
    background: #e6f7ff;
    transition: all .4s ease-in-out;
  }

  .table tr.Tbody input {
    width: 100px;
    height: 30px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all .4s ease-in-out;
    outline: none;
    text-align: center;
  }

  .table tr.Tbody input:hover {
    border: 1px solid #40a9ff;
    transition: all .4s ease-in-out;
  }

  .table tr.Tbody input:focus {
    box-shadow: 0 0 2px 2px #bce3ff;
    border: 1px solid #40a9ff;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  .remarks {
    width: 90%;
    margin: 50px auto;
  }

  .remarks div {
    width: 600px;
    height: 40px;
    line-height: 40px;
  }

  .remarks label {
    display: inline-block;
    width: 10%;
  }

  .remarks input {
    width: 300px;
    height: 30px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all .4s ease-in-out;
    outline: none;
    text-indent: 5px;
  }

  .remarks input:hover {
    border: 1px solid #40a9ff;
    transition: all .4s ease-in-out;
  }

  .remarks input:focus {
    box-shadow: 0 0 2px 2px #bce3ff;
    border: 1px solid #40a9ff;
  }

  .submit {
    width: 90%;
    margin: 0 auto;
  }
</style>
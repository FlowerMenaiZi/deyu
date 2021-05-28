<template>
  <div id="ADSContent">
    <AdminNav :endHeight="endHeight" :NavContent="NavContent"/>
    <div :style="{height:endHeight+'px'}" class="ADSContent">
      <h2>确认录入：</h2>
      <a-table :columns="columns" :data-source="dataSource" bordered>
        <template>
          <div>
            <template>
              {{ text }}
            </template>
          </div>
        </template>
        <template #operation="{ record }">
          <a-popconfirm
                  v-if="dataSource.length"
                  title="Sure to delete?"
                  @confirm="onDelete(record.key)"
          >
            <a>删除</a>
          </a-popconfirm>
        </template>
      </a-table>
      <div class="submit">
        <a-button type="primary" @click="putToSql">提交</a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, inject, reactive, ref, UnwrapRef, onBeforeMount, getCurrentInstance} from 'vue'
  import {cloneDeep} from 'lodash-es';
  import AdminNav from '@/components/AdminNav.vue'
  import {DataItem} from '@/types/AISDI'
  import {saveAISItem, readAISItem} from "@/utils/localStorageUtils";
  import {message} from "ant-design-vue";
  import {useRoute} from "vue-router";
  import router from "@/router";

  const columns = [
    {
      title: '宿舍',
      dataIndex: 'dormitory',
      width: '5%',
      slots: {customRender: 'dormitory'},
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '8%',
      slots: {customRender: 'name'},
    },
    {
      title: '学号',
      dataIndex: 'stuId',
      width: '5%',
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
      title: '备注',
      dataIndex: 'dRemarks',
      slots: {customRender: 'dRemarks'},
    },
    {
      title: '课室',
      dataIndex: 'classroom',
      slots: {customRender: 'classroom'},
    }, {
      title: '备注',
      dataIndex: 'cRemarks',
      slots: {customRender: 'cRemarks'},
    },
    {
      title: '仪表',
      dataIndex: 'meter',
      slots: {customRender: 'meter'},
    }, {
      title: '备注',
      dataIndex: 'mRemarks',
      slots: {customRender: 'mRemarks'},
    },
    {
      title: '纪律',
      dataIndex: 'discipline',
      slots: {customRender: 'discipline'},
    }, {
      title: '备注',
      dataIndex: 'disRemarks',
      slots: {customRender: 'disRemarks'},
    },
    {
      title: '+/-分',
      dataIndex: 'reward',
      slots: {customRender: 'reward'},
    }, {
      title: '备注',
      dataIndex: 'rRemarks',
      slots: {customRender: 'rRemarks'},
    },
    {
      title: '日期',
      dataIndex: 'dateTime',
      slots: {customRender: 'dateTime'},
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '7%',
      slots: {customRender: 'operation'},
    },
  ]

  export default defineComponent({
    name: "AInputScore",
    components: {
      AdminNav
    },
    setup() {
      const endHeight = inject('endHeight')
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
              router.push("/109in")
            }
          }
        )
      })
      const NavContent = reactive([
        {
          key: 1,
          text: '录入分数',
          isSelect: false,
          path: '/8222021519/'+tokenData
        }, {
          key: 2,
          text: '修改分数',
          isSelect: false,
          path: '/9022021520/'+tokenData
        }, {
          key: 3,
          text: '确认录入',
          isSelect: true,
          path: '/9222021521/'+tokenData
        }, {
          key: 4,
          text: '配置选项',
          isSelect: false,
          path: '/10032021522/'+tokenData
        },
      ])
      const data: DataItem[] = [];
      const dataSource = ref(data);
      const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

      const edit = (key: string) => {
        editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
      };
      const onDelete = (key: string) => {
        dataSource.value = dataSource.value.filter(item => item.key !== key);
        saveAISItem(dataSource.value,'AISDI')
      };
      const putToSql= () =>{
        const allData = readAISItem('AISDI')
        if (allData.length<=0){
          message.error('没有可提交的数据');
          return false
        }else{
          for (let item in allData){
            delete allData[item].key
            delete allData[item].dormitory
          }
          proxy.$api.post(
            "/putInsertData",
            {},
            {"semester": localStorage.getItem('semester'),"data":allData},
            (success) => {
              if (success.data == '新增成功' || success.data == '删除成功'){
                localStorage.removeItem('AISDI')
                dataSource.value = []
              }
              message.success('提交成功')
            },
            (error) => {
              message.error(error.data)
            }
          )
        }
      }
      onBeforeMount(() => {
        data.splice(0, data.length)
        for (let item of readAISItem('AISDI')) {
          data.push(item)
        }
      })
      return {
        endHeight,
        NavContent,
        columns,
        dataSource,
        editingKey: '',
        editableData,
        edit,
        putToSql,
        onDelete,
      }
    }
  })
</script>

<style scoped>
  #ADSContent {
    display: flex;
  }

  .ADSContent {
    width: 100%;
    padding: 10px 10px 0 10px;
  }

  .editable-row-operations a {
    margin-right: 8px;
  }
  .submit{
    margin-top: 40px;
    float: right;
  }
</style>
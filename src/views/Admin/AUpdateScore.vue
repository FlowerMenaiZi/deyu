<template>
  <div id="AUSContent">
    <AdminNav :endHeight="endHeight" :NavContent="NavContent"/>
    <div :style="{height:endHeight+'px'}" class="AUSContent">
      <h2>修改分数：</h2>
      <a-table :columns="columns" :data-source="dataSource" bordered>
        <template v-for="col in ['quilt','dorm','dRemarks','classroom','cRemarks','meter','mRemarks','discipline','disRemarks','reward','rRemarks','dateTime']"
                #[col]="{ text, record }"
                :key="col">
          <div>
            <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][col]"
                     style="margin: -5px 0"/>
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template #operation="{ record }">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a @click="save(record.key)">保存</a>
              <a-popconfirm title="你确定不修改吗？" @confirm="cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.key)">编辑</a>
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script lang="ts">
  import {defineComponent, inject, reactive, ref, UnwrapRef, onBeforeMount, getCurrentInstance} from 'vue'
  import {cloneDeep} from 'lodash-es';
  import AdminNav from '@/components/AdminNav.vue'
  import {DataItem} from '@/types/AISDI'
  import {saveAISItem, readAISItem} from "@/utils/localStorageUtils";
  import router from "@/router";
  import {useRoute} from "vue-router";
  import {message} from "ant-design-vue";

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
              localStorage.removeItem('login')
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
          isSelect: true,
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
      const data: DataItem[] = [];
      const dataSource = ref(data);
      const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

      const edit = (key: string) => {
        editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
      };
      const save = (key: string) => {
        Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
        const TemItems:any = []
        for (let item of dataSource.value){
          TemItems.push(item)
        }
        saveAISItem(TemItems,'AISDI')
        delete editableData[key];
      };
      const cancel = (key: string) => {
        delete editableData[key];
      };
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
        save,
        cancel,
      }
    }
  })
</script>

<style scoped>
  #AUSContent {
    display: flex;
  }

  .AUSContent {
    width: 100%;
    padding: 10px 10px 0 10px;
  }

  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
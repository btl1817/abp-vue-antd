<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="任务卡号">
              <a-input v-model="queryParam.CardCode" placeholder="任务卡号" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="工艺编号">
              <a-input v-model="queryParam.TechnologyCode" placeholder="工艺编号" />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="任务状态">
                <a-select v-model="queryParam.status" placeholder="-请选择-" default-value="0">
                  <a-select-option value="0">新建</a-select-option>
                  <a-select-option value="1">执行</a-select-option>
                  <a-select-option value="2">完成</a-select-option>
                  <a-select-option value="3">作废</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="任务日期">
                <a-range-picker style="width: 100%" v-model="queryParam.PlanData" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="创建时间">
                <a-range-picker style="width: 100%" v-model="queryParam.CreateTime" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
            >
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.CreateOrEdit.createOrEdit()">新建</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">修改</a>
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="handleStop(record)">停用</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="handleDel(record)">删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </span>
    </s-table>
    <CreateOrEdit ref="CreateOrEdit" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import CreateOrEdit from './modules/CreateOrEdit'
import { getRoleList, getServiceList } from '@/api/manage'
import { getPlan } from '@/api/plan/manager'

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'PlanManager',
  components: {
    STable,
    CreateOrEdit
  },
  data() {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '任务卡号',
          dataIndex: 'CardCode',
          sorter: true
        },
        {
          title: '工艺编码',
          dataIndex: 'Code',
          sorter: true
        },
        {
          title: '计划日期',
          dataIndex: 'Date',
          sorter: true
        },
        {
          title: '创建日期',
          dataIndex: 'CreateTime',
          sorter: true
        },
        {
          title: '创建人',
          dataIndex: 'CreateUser'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        return getPlan(Object.assign(parameter, this.queryParam)).then(res => {
          if (res.result) return res.result
          else return null
        })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: {
          show: false,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  },
  created() {
    // this.tableOption()
    // getRoleList({ t: new Date() })
  },
  methods: {
    // tableOption() {
    //   if (!this.optionAlertShow) {
    //     this.options = {
    //       alert: {
    //         show: false,
    //         clear: () => {
    //           this.selectedRowKeys = []
    //         }
    //       },
    //       rowSelection: {
    //         selectedRowKeys: this.selectedRowKeys,
    //         onChange: this.onSelectChange,
    //         getCheckboxProps: record => ({
    //           // props: {
    //           //   disabled: record.no === 'No 2', // Column configuration not to be checked
    //           //   name: record.no
    //           // }
    //         })
    //       }
    //     }
    //     this.optionAlertShow = true
    //   } else {
    //     this.options = {
    //       alert: false,
    //       rowSelection: null
    //     }
    //     this.optionAlertShow = false
    //   }
    // },

    handleEdit(record) {
      console.log(record)
      this.$refs.CreateOrEdit.createOrEdit(record)
    },
    handleDetail(record) {
      this.$message.info(`${record.code} 明细`)
    },
    handleStop(record) {
      this.$message.info(`${record.code} 停用`)
    },
    handleDel(record) {
      this.$message.info(`${record.code} 删除`)
    },
    handleOk() {
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>

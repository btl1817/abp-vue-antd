<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="16" :sm="48">
            <a-form-item label="模糊搜索">
              <a-input v-model="queryParam.queryParam" placeholder="模糊搜索" />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="点检状态">
                <a-select v-model="queryParam.status" placeholder="-请选择-">
                  <a-select-option value>-请选择-</a-select-option>
                  <a-select-option value="1">通过</a-select-option>
                  <a-select-option value="32">异常</a-select-option>
                  <a-select-option value="33">忽略</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="创建时间">
                <a-range-picker style="width: 100%" v-model="queryParam.creationTime" />
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
      <a-button
        type="primary"
        icon="plus"
        style="visibility: collapse; "
        @click="$refs.Create.create()"
      >新建任务</a-button>
      <a-button type="ghost" style="float: right;" @click="switchTable">{{ tabStyle }}</a-button>
    </div>

    <s-table
      ref="table"
      rowKey="id"
      showPagination="auto"
      :size="tabSize"
      :columns="columns"
      :data="loadData"
    >
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>

      <span slot="creationTime" slot-scope="creationTime">{{ timeFormat(creationTime) }}</span>

      <span slot="status" slot-scope="status">
        <a-badge :status="status | statusTypeFilter" :text="status | statusFilter" />
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">详情</a>
        </template>
      </span>

      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{ record.remark }}</p>
    </s-table>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'
import { getPlan, nullifyPlan } from '@/api/plan/manager'
import { getTechnologyList } from '@/api/technology/info'

const statusMap = {
  1: {
    status: 'success',
    text: '通过'
  },
  32: {
    status: 'error',
    text: '异常'
  },
  33: {
    status: 'warning',
    text: '忽略'
  }
}
export default {
  name: 'CheckLog',
  components: {
    STable,
    moment
  },
  data() {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      tabSize: 'default',
      tabStyle: '紧凑',
      // 表头
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '检查时间',
          dataIndex: 'creationTime',
          scopedSlots: { customRender: 'creationTime' },
          sorter: true
        },
        {
          title: '产线',
          dataIndex: 'productLineName',
          sorter: true
        },
        {
          title: '设备',
          dataIndex: 'deviceName',
          sorter: true
        },
        {
          title: '检测项',
          dataIndex: 'checkItem',
          sorter: true
        },
        {
          title: '标准值',
          dataIndex: 'standardValue'
        },
        {
          title: '上限值',
          dataIndex: 'upperLimit'
        },
        {
          title: '下限值',
          dataIndex: 'lowerLimit'
        },
        {
          title: '检测值',
          dataIndex: 'checkedValue'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作人',
          dataIndex: 'creatorUser'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '80px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        // console.log('loadData.parameter', parameter)
        return getPlan(Object.assign(parameter, this.queryParam)).then(res => {
          if (res.result) return res.result
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
      optionAlertShow: false,

      technologyList: []
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    },
    shiftsFilter(shifts) {
      return ShiftsMap[shifts]
    }
  },
  created() {
    // getRoleList({ t: new Date() })
  },
  methods: {
    handleSearch(value) {
      getTechnologyList({ input: value })
        .then(res => {
          if (res.result) this.technologyList = res.result
          else return null
        })
        .catch(err => {
          ref.$message.error(err.message)
        })
    },
    switchTable() {
      if (this.tabSize === 'default') {
        this.tabSize = 'small'
        this.tabStyle = '普通'
      } else {
        this.tabSize = 'default'
        this.tabStyle = '紧凑'
      }
    },
    onSelect(value) {
      var a = 1
    },
    handleDetail(record) {
      this.$message.info(`${record.code} 明细`)
    },
    handleDel(record) {
      nullifyPlan(record)
        .then(res => {
          this.$refs.table.refresh(true)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
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
    },
    timeFormat(t) {
      return moment(t).format('YYYY-MM-DD hh:mm:ss')
    }
  }
}
</script>
<style>
.certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
  color: #666;
  font-weight: bold;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
  border-bottom: 1px solid #f6f6f6;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item {
  padding-left: 16px;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
  text-align: center;
  cursor: default;
}

.certain-category-search-dropdown .ant-select-dropdown-menu {
  max-height: 300px;
}
</style>
<style scoped>
.certain-category-search-wrapper
  >>> .certain-category-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix {
  right: 12px;
}
.certain-category-search-wrapper >>> .certain-search-item-count {
  position: absolute;
  color: #999;
  right: 16px;
}
.certain-category-search-wrapper >>> .certain-category-search.ant-select-focused .certain-category-icon {
  color: #108ee9;
}
.certain-category-search-wrapper >>> .certain-category-icon {
  color: #6e6e6e;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 16px;
}
</style>
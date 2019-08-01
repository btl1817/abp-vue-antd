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
              <a-auto-complete
                v-model="queryParam.TechnologyCode"
                class="certain-category-search"
                dropdownClassName="certain-category-search-dropdown"
                @select="onSelect"
                @search="handleSearch"
                placeholder="工艺编码"
                optionLabelProp="value"
              >
                <template slot="dataSource">
                  <a-select-option v-for="item in technologyList" :key="item.code">
                    {{ item.rubberCode }}
                    <a-row :gutter="24">
                      <a-col :span="10">{{ item.code }}</a-col>
                      <a-col :span="14">{{ item.name }}</a-col>
                    </a-row>
                  </a-select-option>
                </template>
                <a-input>
                  <a-icon slot="suffix" type="search" class="certain-category-icon" />
                </a-input>
              </a-auto-complete>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="任务状态">
                <a-select v-model="queryParam.status" placeholder="-请选择-">
                  <a-select-option value>-请选择-</a-select-option>
                  <a-select-option value="0">新建</a-select-option>
                  <a-select-option value="1">出卡</a-select-option>
                  <a-select-option value="2">配料</a-select-option>
                  <a-select-option value="3">密炼</a-select-option>
                  <a-select-option value="4">待检</a-select-option>
                  <a-select-option value="5">完成</a-select-option>
                  <a-select-option value="6">质检报废</a-select-option>
                  <a-select-option value="7">生产报废</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="任务日期">
                <a-range-picker style="width: 100%" v-model="queryParam.PlanDate" />
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
      <span>
        <a-button type="primary" icon="plus" @click="$refs.Create.create()">新建</a-button>
      </span>
      <span style="{float: right;}">
        <a-button @click="switchTable">切换样式</a-button>
      </span>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      showPagination="auto"
      :columns="columns"
      :data="loadData"
    >
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>

      <span slot="shifts" slot-scope="shifts">{{ shifts | shiftsFilter }}</span>

      <span slot="status" slot-scope="status">
        <a-badge :status="status | statusTypeFilter" :text="status | statusFilter" />
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="是否确认作废"
            @confirm="handleDel(record)"
            @cancel="cancel"
            okText="作废"
            cancelText="取消"
            okType="danger"
          >
            <a-icon slot="icon" type="question-circle" style="color: orange" />
            <a href="#">作废</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>
    <Create ref="Create" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import Create from './modules/Create'
import Edit from './modules/Edit'
import { getRoleList, getServiceList } from '@/api/manage'
import { getPlan } from '@/api/plan/manager'
import { getTechnologyList } from '@/api/technology/info'

const statusMap = {
  0: {
    status: 'default',
    text: '新建'
  },
  1: {
    status: 'processing',
    text: '出卡'
  },
  2: {
    status: 'processing',
    text: '配料'
  },
  3: {
    status: 'processing',
    text: '密炼'
  },
  4: {
    status: 'warning',
    text: '待检'
  },
  5: {
    status: 'success',
    text: '完成'
  },
  6: {
    status: 'error',
    text: '质检报废'
  },
  7: {
    status: 'error',
    text: '生产报废'
  }
}

const ShiftsMap = { 0: '不限', 1: 'A班', 2: 'B班', 3: 'C班' }

export default {
  name: 'PlanManager',
  components: {
    STable,
    Create,
    Edit
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
          dataIndex: 'cardCode',
          sorter: true
        },
        {
          title: '工艺编码',
          dataIndex: 'technologyCode',
          sorter: true
        },
        {
          title: '产线',
          dataIndex: 'productLineName',
          sorter: true
        },
        {
          title: '计划日期',
          dataIndex: 'planDate',
          sorter: true
        },
        {
          title: '班次',
          dataIndex: 'shifts',
          scopedSlots: { customRender: 'shifts' },
          sorter: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建日期',
          dataIndex: 'createdTime',
          sorter: true
        },
        {
          title: '创建人',
          dataIndex: 'createdUser'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
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
      getTechnologyList({ input: value }).then(res => {
        if (res.result) this.technologyList = res.result
        else return null
      })
    },
    switchTable() {
      if (this.$refs.table.size === 'default') this.$refs.table.size = 'small'
      else this.$refs.table.size = 'default'
    },
    onSelect(value) {
      var a = 1
    },
    handleEdit(record) {
      console.log(record)
      this.$refs.Create.create(record)
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
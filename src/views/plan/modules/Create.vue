<template>
  <a-modal
    title="添加计划"
    :width="800"
    :visible="visible"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" class="ant-advanced-form">
        <a-row :gutter="24">
          <a-col :span="16" :style="{ display: 'block'}">
            <a-form-item label="工艺编码">
              <a-auto-complete
                class="certain-category-search"
                dropdownClassName="certain-category-search-dropdown"
                @select="onSelect"
                @search="handleSearch"
                placeholder="工艺编码"
                optionLabelProp="value"
                v-decorator="['technologyCode', {rules: [{ required: true, message: '请选择工艺编码'}]}]"
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
          <a-col :span="8" :style="{ display: 'block'}">
            <a-form-item label="数量">
              <a-input
                v-decorator="['Qty',{rules: [{ message: '请输入控制时间!' }],initialValue: '1'}]"
                placeholder="数量"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8" :style="{ display: 'block'}">
            <a-form-item label="计划日期">
              <a-date-picker
                v-decorator="['PlanDate', {rules: [{ required: true, message: '请输入计划日期'}], initialValue:getdate()}]"
                placeholder="计划日期"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8" :style="{ display: 'block'}">
            <a-form-item label="班次">
              <a-select
                v-decorator="['Shifts', {rules: [{ required: true, message: '请选择班次' }], initialValue: '0'}]"
                placeholder="班次"
              >
                <a-select-option value="0" key="0">不限</a-select-option>
                <a-select-option value="1" key="1">A班</a-select-option>
                <a-select-option value="2" key="2">B班</a-select-option>
                <a-select-option value="3" key="3">C班</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8" :style="{ display: 'block'}">
            <a-form-item label="产线">
              <a-select
                v-decorator="['ProductLineId',{rules: [{ required: true, message: '请选择产线' }]}]"
                placeholder="产线"
              >
                <a-select-option
                  v-for="productLine in productLists"
                  :value="productLine.id"
                  :key="productLine.id"
                >
                  <a-row :gutter="24">
                    <a-col :span="10">{{ productLine.code }}</a-col>
                    <a-col :span="14">{{ productLine.name }}</a-col>
                  </a-row>
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" :style="{ display: 'block'}">
            <a-form-item label="外部单号">
              <a-input v-decorator="['orderCode']" placeholder="外部单号" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24" :style="{ display: 'block'}">
            <a-form-item label="任务说明">
              <a-textarea v-decorator="['Remark']" placeholder="任务说明" :rows="3" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getTechnologyList } from '@/api/technology/info'
import { getProductList } from '@/api/product/manager'
import { createPlan } from '@/api/plan/manager'
import moment from 'moment'

const stepForms = ['technologyCode', 'Qty', 'PlanDate', 'Shifts', 'ProductLineId']
// 'technologyCode', 'Qty', 'PlanDate', 'Shifts', 'ProductLineId']
export default {
  name: 'Create',
  data() {
    return {
      visible: false,
      confirmLoading: false,
      productLists: [],
      technologyList: [],

      form: this.$form.createForm(this)
    }
  },
  methods: {
    getdate() {
      return moment(moment().format('YYYY-MM-DD'))
    },
    create() {
      this.visible = true
      // this.confirmLoading = true

      getProductList({ input: '' }).then(res => {
        if (res.result) this.productLists = res.result
      })
      // this.confirmLoading = false
    },
    handleSearch(value) {
      getTechnologyList({ input: value }).then(res => {
        if (res.result) this.technologyList = res.result
      })
    },
    onSelect(value) {},
    handleCancel() {
      this.visible = false
    },
    handleOk() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields(stepForms, (errors, values) => {
        if (!errors) {
          var formData = {
            detail: {
              ...values
            }
          }
          createPlan(formData)
            .then(response => {
              this.confirmLoading = false
              this.visible = false
              this.$emit('ok', { formData })
            })
            .catch(err => {
              this.confirmLoading = false
              this.$message.error(`添加失败: ${err.message}`)
            })
        } else {
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>
<style>
.ant-advanced-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-form .ant-form-item {
  display: flex;
}

.ant-advanced-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced .ant-form {
  max-width: none;
}
#components-form-demo-advanced .result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
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
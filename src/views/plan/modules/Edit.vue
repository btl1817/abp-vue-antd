<template>
  <a-modal
    :title="id? '修改计划' : '添加计划'"
    :width="900"
    :visible="visible"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form :form="form" class="ant-advanced-form">
      <a-row :gutter="24">
        <a-col :span="8" :style="{ display: 'block'}">
          <a-form-item label="任务卡号">
            <a-input 
              read-only
              v-decorator="['CardCode']"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8" :style="{ display: 'block'}">
          <a-form-item label="工艺编码">
            <a-input
              v-decorator="['TechnologyCode']"
              placeholder="工艺编码"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8" :style="{ display: 'block'}">
          <a-form-item label="计划日期">
            <a-date-picker
              v-decorator="['PlanDate']"
              placeholder="计划日期"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="16" :style="{ display: 'block'}">
          <a-form-item label="备注">
            <a-input 
              v-decorator="['Remark']"
              placeholder="任务备注"
            />
          </a-form-item>
        </a-col>
        <a-col :span="8" :style="{ display: 'block'}">
          <a-form-item label="班次">
            <a-input
              v-decorator="['Shifts']"
              placeholder="班次"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { Result } from '@/components'
import pick from 'lodash.pick'

const stepForms = [
  [
    'surname',
    'name',
    'userName',
    'emailAddress',
    'phoneNumber',
    'password',
    'shouldChangePasswordOnNextLogin',
    'isLockoutEnabled',
    'isActive'
  ],
  ['assignedRoleNames'],
  []
]

export default {
  components: {
    Result,
  },
  name: 'Edit',
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      id: undefined,
      visible: false,
      confirmLoading: false,
      currentStep: 0,

      form: this.$form.createForm(this)
    }
  },
  methods: {
    create(id) {
      this.id = id
      this.visible = true
      
      // this.confirmLoading = true

      // this.confirmLoading = false
    },
    showStep(step) {
      this.currentStep = step
    },
    // 下一步
    handleNext(step) {
      const {
        form: { validateFields }
      } = this
      const currentStep = step + 1
      if (currentStep <= 10) {
        validateFields(stepForms[this.currentStep], (errors, values) => {
          if (!errors) {
            this.currentStep = currentStep
          }
        })
        return
      }
      this.confirmLoading = true
    },
    // 上一步
    backward() {
      this.currentStep--
    },
    // 取消
    handleCancel() {
      this.visible = false
      this.currentStep = 0
    },
    handleOk() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          var formData = {
            detail: {
              id: this.id,
              step: this.currentStep,
              ...values
            }
          }
          createOrUpdateUser(formData)
            .then(response => {
              this.confirmLoading = false
              this.visible = false
              this.currentStep = 0
              this.$emit('ok', { formData })
            })
            .catch(err => {
              this.confirmLoading = false
              this.$message.error(`${this.id ? '修改' : '添加'}失败: ${err.message}`)
            })
        } else {
          this.confirmLoading = false
          this.currentStep = 0
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
</style>
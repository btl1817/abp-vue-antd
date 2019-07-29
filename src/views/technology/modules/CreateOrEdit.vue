<template>
  <a-modal
    :title="userId? '修改工艺' : '添加工艺'"
    :width="900"
    :visible="visible"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-steps :current="currentStep" :style="{ marginBottom: '28px',cursor:'pointer' }" size="small">
        <a-step title="信息" @click="showStep(0)" />
        <a-step title="步1" @click="showStep(1)" />
        <a-step title="步2" @click="showStep(2)" />
        <a-step title="步3" @click="showStep(3)" />
        <a-step title="步4" @click="showStep(4)" />
        <a-step title="步5" @click="showStep(5)" />
        <a-step title="步6" @click="showStep(6)" />
        <a-step title="步7" @click="showStep(7)" />
        <a-step title="步8" @click="showStep(8)" />
        <a-step title="步9" @click="showStep(9)" />
        <a-step title="步10" @click="showStep(10)" />
      </a-steps>
      <a-form :form="form" class="ant-advanced-form">
        <div v-show="currentStep === 0">
          <a-form-item label="胶号" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="['RubberCode', {rules: [{ type: 'string', required: true, message: '请输入控制温度'}]}]"
              placeholder="胶号"
            />
          </a-form-item>
          <a-form-item label="工艺编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="['Code', {rules: [{ type: 'string', required: true, message: '请输入控制温度'}]}]"
              placeholder="工艺编码"
            />
          </a-form-item>
          <a-form-item label="工艺名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="['Name', {rules: [{ type: 'string', required: true, message: '请输入控制温度'}]}]"
              placeholder="工艺名称"
            />
          </a-form-item>
          <a-form-item label="排胶温度" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="['Temp', {rules: [{ type: 'number', required: true, message: '请输入控制温度', transform(value) {if(value){return Number(value);}}}]}]"
              placeholder="排胶温度"
            />
          </a-form-item>
          <a-form-item label="排胶重量" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-decorator="['Weight', {rules: [{ type: 'number', required: true, message: '请输入控制温度', transform(value) {if(value){return Number(value);}}}]}]"
              placeholder="排胶重量"
            />
          </a-form-item>
        </div>
        <div v-for="(item,i) in 10" :key="item" v-show="currentStep === item">
          <a-row :gutter="24">
            <a-col :span="8" :style="{ display: 'block'}">
              <a-form-item label="控制温度">
                <a-input
                  v-decorator="['temp'+String(i), {rules: [{ type: 'number', message: '请输入控制温度', transform(value) {if(value){return Number(value);}}}]}]"
                  placeholder="控制温度"
                  addonAfter="℃"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8" :style="{ display: 'block'}">
              <a-form-item label="控制时间">
                <a-input
                  v-decorator="['time'+String(i), {rules: [{ type: 'number', message: '请输入控制时间!', transform(value) {if(value){return Number(value);}} }]}]"
                  placeholder="控制时间"
                  addonAfter="秒"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8" :style="{ display: 'block'}">
              <a-form-item label="控制总功">
                <a-input
                  v-decorator="['power'+String(i), {rules: [{ type: 'number', message: 'Please select time!', transform(value) {if(value){return Number(value);}} }]}]"
                  placeholder="控制总功"
                  addonAfter="kw"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8" :style="{ display: 'block'}">
              <a-form-item label="控制方式">
                <a-select
                  style="width: 100%"
                  v-decorator="['type'+String(i), {rules: [{ type: 'string', message: 'Please select time!' }]}]"
                >
                  <a-select-option value="1">温度</a-select-option>
                  <a-select-option value="2">时间</a-select-option>
                  <a-select-option value="3">总功</a-select-option>
                  <a-select-option value="4">温度与时间</a-select-option>
                  <a-select-option value="5">温度或时间</a-select-option>
                  <a-select-option value="6">温度与总功</a-select-option>
                  <a-select-option value="7">温度或总功</a-select-option>
                  <a-select-option value="8">时间与总功</a-select-option>
                  <a-select-option value="9">时间或总功</a-select-option>
                  <a-select-option value="10">温度与时间与总功</a-select-option>
                  <a-select-option value="11">温度或时间与总功</a-select-option>
                  <a-select-option value="12">温度与时间或总功</a-select-option>
                  <a-select-option value="13">温度或时间或总功</a-select-option>
                </a-select>
                <!-- <a-input v-decorator="['type']" placeholder="控制方式"/> -->
              </a-form-item>
            </a-col>
            <a-col :span="8" :style="{ display: 'block'}">
              <a-form-item label="是否清扫">
                <a-switch defaultUnChecked v-decorator="['isClear'+String(i)]">
                  <a-icon type="check" slot="checkedChildren" />
                  <a-icon type="close" slot="unCheckedChildren" />
                </a-switch>
              </a-form-item>
            </a-col>
            <a-col :span="8" :style="{ display: 'block'}">
              <a-form-item label="电机转速">
                <a-input
                  v-decorator="['speed'+String(i), {rules: [{ type: 'string', message: 'Please select time!' }]}]"
                  placeholder="电机转速"
                  addonAfter="转"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8" :style="{ display: 'block'}">
              <a-form-item label="A停顿时间">
                <a-input
                  v-decorator="['aStopTime'+String(i), {rules: [{ type: 'string', message: 'Please select time!' }]}]"
                  placeholder="A位置停顿时间"
                  addonAfter="秒"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8" :style="{ display: 'block'}">
              <a-form-item label="B停顿时间">
                <a-input
                  v-decorator="['bStopTime'+String(i), {rules: [{ type: 'string', message: 'Please select time!' }]}]"
                  placeholder="B位置停顿时间"
                  addonAfter="秒"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8" :style="{ display: 'block'}">
              <a-form-item label="C停顿时间">
                <a-input
                  v-decorator="['cStopTime'+String(i), {rules: [{ type: 'string', message: 'Please select time!' }]}]"
                  placeholder="C位置停顿时间"
                  addonAfter="秒"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8" :style="{ display: 'block'}">
              <a-form-item label="投料温度下限">
                <a-input
                  v-decorator="['feedMinTemp'+String(i), {rules: [{ type: 'string', message: 'Please select time!' }]}]"
                  placeholder="投料温度下限"
                  addonAfter="℃"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8" :style="{ display: 'block'}">
              <a-form-item label="投料温度上限">
                <a-input
                  v-decorator="['feedMaxTemp'+String(i), {rules: [{ type: 'string', message: 'Please select time!' }]}]"
                  placeholder="投料温度上限"
                  addonAfter="℃"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8" :style="{ display: 'block'}">
              <a-form-item label="冷水温度">
                <a-input
                  v-decorator="['waterTemp'+String(i), {rules: [{ type: 'string', message: 'Please select time!' }]}]"
                  placeholder="冷却水启动温度"
                  addonAfter="℃"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="back" @click="backward" v-if="currentStep > 0" :style="{ float: 'left' }">上一步</a-button>
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="ok" @click="handleOk" type="primary">完成</a-button>
      <a-button key="forward" v-if="currentStep < 10" @click="handleNext(currentStep)">下一步</a-button>
    </template>
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
    Result
  },
  name: 'CreateOrEdit',
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
      userId: undefined,
      profilePicture: null,
      roles: [],
      selectedRoles: [],
      treeData: [],
      selectedOus: [],
      setRandomPassword: false,
      sendActivationEmail: false,
      confirmDirty: false,
      visible: false,
      confirmLoading: false,
      currentStep: 0,

      form: this.$form.createForm(this)
    }
  },
  methods: {
    createOrEdit(id) {
      // this.userId = id
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
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          console.log('values:', values)
          setTimeout(() => {
            this.confirmLoading = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
      return
      validateFields((errors, values) => {
        if (!errors) {
          var formData = {
            user: {
              id: this.userId,
              ...values
            },
            assignedRoleNames: values.assignedRoleNames,
            sendActivationEmail: this.sendActivationEmail,
            setRandomPassword: this.setRandomPassword,
            organizationUnits: this.selectedOus
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
              this.$message.error(`${this.userId ? '修改' : '添加'}失败: ${err.message}`)
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
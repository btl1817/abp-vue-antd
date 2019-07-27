<template>
  <a-modal
    title="密炼信息详情"
    :width="900"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-steps
        :current="currentStep"
        :style="{ marginBottom: '28px' }"
        size="small"
      >
        <a-step title="基本" @click="showStep(0)" />
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
      <a-form :form="form" :layout="Inline" class="ant-advanced-form">
        <!-- step1 -->
        <div v-show="currentStep === 0">
          <a-form-item label="监控对象" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
              v-decorator="['target', {initialValue: 0, rules: [{required: true}]}]"
              style="width: 100%"
            >
              <a-select-option :value="0">表一</a-select-option>
              <a-select-option :value="1">表二</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="规则模板" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
              v-decorator="['template', { initialValue: 0, rules: [{required: true}]}]"
              style="width: 100%"
            >
              <a-select-option :value="0">规则模板一</a-select-option>
              <a-select-option :value="1">规则模板二</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="规则类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group
              v-decorator="['type', {initialValue: 0, rules: [{required: true}]}]"
              style="width: 100%"
            >
              <a-radio :value="0">强</a-radio>
              <a-radio :value="1">弱</a-radio>
            </a-radio-group>
          </a-form-item>
        </div>
        <div v-show="currentStep === 1">
          <a-row :gutter="24">
            <a-col 
              :span="8"
              :style="{ display: 'block'}"
            >
              <a-form-item label="控制温度" >
                <a-input v-decorator="['temp']" placeholder="控制温度" addonAfter="℃"/>
              </a-form-item>
            </a-col>
            <a-col 
              :span="8"
              :style="{ display: 'block'}"
            >
              <a-form-item label="控制时间" >
                <a-input v-decorator="['time']" placeholder="控制时间" addonAfter="秒"/>
              </a-form-item>
            </a-col>
            <a-col 
              :span="8"
              :style="{ display: 'block'}"
            >
              <a-form-item label="控制总功" >
                <a-input v-decorator="['power']" placeholder="控制总功" addonAfter="kw"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col 
              :span="8"
              :style="{ display: 'block'}"
            >
              <a-form-item label="控制方式" >
                <a-select defaultValue="温度" style="width: 100%" @change="handleChange">
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
            <a-col 
              :span="8"
              :style="{ display: 'block'}"
            >
              <a-form-item label="是否清扫" >
                <a-switch defaultUnChecked v-decorator="['isClear']" >
                  <a-icon type="check" slot="checkedChildren"/>
                  <a-icon type="close" slot="unCheckedChildren"/>
                </a-switch>
              </a-form-item>
            </a-col>
            <a-col 
              :span="8"
              :style="{ display: 'block'}"
            >
              <a-form-item label="电机转速" >
                <a-input v-decorator="['speed']" placeholder="电机转速" addonAfter="转"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col 
              :span="8"
              :style="{ display: 'block'}"
            >
              <a-form-item label="A停顿时间" >
                <a-input v-decorator="['aStopTime']" placeholder="A位置停顿时间" addonAfter="秒"/>
              </a-form-item>
            </a-col>
            <a-col 
              :span="8"
              :style="{ display: 'block'}"
            >
              <a-form-item label="B停顿时间" >
                <a-input v-decorator="['bStopTime']" placeholder="B位置停顿时间" addonAfter="秒"/>
              </a-form-item>
            </a-col>
            <a-col 
              :span="8"
              :style="{ display: 'block'}"
            >
              <a-form-item label="C停顿时间" >
                <a-input v-decorator="['cStopTime']" placeholder="C位置停顿时间" addonAfter="秒"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col 
              :span="8"
              :style="{ display: 'block'}"
            >
              <a-form-item label="投料温度下限" >
                <a-input v-decorator="['feedMinTemp']" placeholder="投料温度下限" addonAfter="℃"/>
              </a-form-item>
            </a-col>
            <a-col 
              :span="8"
              :style="{ display: 'block'}"
            >
              <a-form-item label="投料温度上限" >
                <a-input v-decorator="['feedMaxTemp']" placeholder="投料温度上限" addonAfter="℃"/>
              </a-form-item>
            </a-col>
            <a-col 
              :span="8"
              :style="{ display: 'block'}"
            >
              <a-form-item label="冷水温度" >
                <a-input v-decorator="['waterTemp']" placeholder="冷却水启动温度" addonAfter="℃"/>
              </a-form-item>
            </a-col>
          </a-row>
        </div>

        <div v-show="currentStep === 2">
          <a-form-item label="开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-date-picker
              v-decorator="['time', {rules: [{ type: 'object', required: true, message: 'Please select time!' }]}]"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="调度周期" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
              v-decorator="['frequency', { initialValue: 'month', rules: [{required: true}]}]"
              style="width: 100%"
            >
              <a-select-option value="month">月</a-select-option>
              <a-select-option value="week">周</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <!-- step1 end -->
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="back" @click="backward" v-if="currentStep > 0" :style="{ float: 'left' }">上一步</a-button>
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="ok" :loading="confirmLoading" @click="handleCancel" type="primary">完成</a-button>
      <a-button key="forward" v-if="currentStep < 10" @click="handleNext(currentStep)">下一步</a-button>
    </template>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

const stepForms = [
  ['name', 'desc'],
  ['target', 'template', 'type'],
  ['time', 'frequency']
]

export default {
  name: 'StepByStepModal',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      currentStep: 0,
      mdl: {},

      form: this.$form.createForm(this)
    }
  },
  methods: {
    showStep (step){
      this.currentStep = step
    },
    edit (record) {
      this.visible = true
      const { form: { setFieldsValue } } = this
      this.$nextTick(() => {
        setFieldsValue(pick(record, []))
      })
    },
    handleNext (step) {
      const { form: { validateFields } } = this
      const currentStep = step + 1
      if (currentStep <= 2) {
        // stepForms
        validateFields(stepForms[ this.currentStep ], (errors, values) => {
          if (!errors) {
            this.currentStep = currentStep
          }
        })
        return
      }
      // last step
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
    },
    backward () {
      this.currentStep--
    },
    handleCancel () {
      // clear form & currentStep
      this.visible = false
      this.currentStep = 0
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
<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical" @submit="update">
          <a-form-item label="姓名：">{{ user.surname }} {{ user.name }}</a-form-item>
          <a-form-item label="原密码：" :required="false">
            <a-input placeholder="原密码" v-model="oldpwd" />
          </a-form-item>
          <a-form-item label="新密码：" :required="false">
            <a-input placeholder="新密码" v-model="newpwd" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="update">提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>

    <avatar-modal ref="modal"></avatar-modal>
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { message } from 'ant-design-vue'
import { changePassword } from '@/api/precise/user'

export default {
  components: {
    AvatarModal
  },
  data() {
    return {
      // cropper
      preview: {},
      user: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
      oldpwd: '',
      newpwd: '',

      form: this.$form.createForm(this)
    }
  },
  computed: {
    appSession() {
      return this.$store.getters.appSession
    }
  },

  created() {
    this.user = this.appSession.user
    // getRoleList().then(res => {
    //   console.log('workplace -> call getRoleList()', res)
    // })

    // getServiceList().then(res => {
    //   console.log('workplace -> call getServiceList()', res)
    // })
  },
  methods: {
    update(e) {
      this.$message.info(this.oldpwd+'|'+this.newpwd)
      changePassword({ currentPassword: this.oldpwd,newPassword:this.newpwd })
        .then(response => {
          this.$message.info('密码修改成功！')
          // this.$refs.table.refresh(true)
        })
        .catch(err => {
          this.$message.info('密码修改失败！')
          // this.$message.error(err.message)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>

<template>
  <a-modal title="权限" :width="640" :visible="visible" :confirmLoading="confirmLoading">
    <template slot="footer">
      <a-button key="back" @click="resetPermissions">重置权限</a-button>
      <a-button key="cancel" @click="handleCancel">关闭</a-button>
      <a-button key="submit" type="primary" @click="handleSubmit">保存</a-button>
    </template>
    <a-spin :spinning="confirmLoading">
      <a-tree 
        checkable 
        :treeData="treeData" 
        v-model="selectedPermissions" 
        @check="onCheck" 
        :checkedKeys="checkedKeys" 
        :info="treeData">
      </a-tree>
    </a-spin>
  </a-modal>
</template>

<script>
import { getUserPermissionsForEdit, resetUserSpecificPermissions, updateUserPermissions } from '@/api/precise/user'
import { createTree } from '@/utils/arrayToTreeConverter'
import { findNode, findParent } from '@/utils/treeDataHelper'

export default {
  data() {
    return {
      userId: undefined,
      visible: false,
      confirmLoading: false,
      treeData: [],
      selectedPermissions: [],
      sendselected: []
    }
  },
  methods: {
    edit(id) {
      this.userId = id
      this.visible = true
      this.confirmLoading = true
      this.getUserPermissions()
    },
    getUserPermissions() {
      this.treeData = []
      this.selectedPermissions = []
      this.sendselected = []
      getUserPermissionsForEdit({ id: this.userId })
        .then(response => {
          const result = response.result
          this.treeData = createTree(result.permissions, 'parentName', 'name', null, 'children', [
            {
              target: 'key',
              targetFunction(item) {
                return item.name
              }
            },
            {
              target: 'title',
              source: 'displayName'
            }
          ])

          _.forEach(result.grantedPermissionNames, permission => {
            const item = findNode(this.treeData, { data: { name: permission } })
            if (item) {
              this.selectedPermissions.push(item.key)
            }
          })
          this.sendselected = this.selectedPermissions.slice(0)
          this.confirmLoading = false
        })
        .catch(err => {
          this.confirmLoading = false
          this.$message.error(err.message)
        })
    },
    resetPermissions() {
      this.confirmLoading = true
      resetUserSpecificPermissions({ id: this.userId })
        .then(response => {
          this.confirmLoading = false
          this.getUserPermissions()
        })
        .catch(err => {
          this.confirmLoading = false
          this.$message.error(err.message)
        })
    },

    onCheck(checkedKeys, info) {
        // let checkedKeysResult = [...checkedKeys, ...info.halfCheckedKeys]

        // alert(info.halfCheckedKeys)
        // alert(checkedKeys)
        // alert(checkedKeys.concat(info.halfCheckedKeys))
        this.sendselected = checkedKeys.concat(info.halfCheckedKeys)
        // alert(this.sendselected)
        // this.setState({ 
        //      sendselected,
        //  })
    },

    handleSubmit() {
      this.confirmLoading = true
      // alert(this.sendselected)
      updateUserPermissions({ id: this.userId, grantedPermissionNames: this.sendselected })
        .then(response => {
          this.visible = false
          this.confirmLoading = false
          this.$emit('ok', response)
        })
        .catch(err => {
          this.confirmLoading = false
          this.$message.error(err.message)
        })
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>

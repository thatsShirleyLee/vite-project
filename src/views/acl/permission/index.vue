<script setup lang="ts">
defineOptions({
  name: 'Permission',
})
import { ref, onMounted, reactive } from 'vue'
import {
  reqAllPermission,
  reqAddOrUpdateMenu,
  reqRemoveMenu,
} from '@/api/acl/permission'
import type {
  PermissionResponseData,
  PermissionList,
  MenuParams,
} from '@/api/acl/permission/type'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
let permissionList = ref<PermissionList>()
let dialogVisible = ref<boolean>(false)
const getPermissionList = async () => {
  const res: PermissionResponseData = await reqAllPermission()
  if (res.code === 200) {
    permissionList.value = res.data
  }
}
onMounted(() => {
  getPermissionList()
})

// 添加 ｜ 编辑
let menuParams = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
const addPermission = (row: MenuParams) => {
  // 清空数据
  Object.assign(menuParams, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  // 对话框显示出来
  dialogVisible.value = true
  // 收集新增的菜单的level数值
  menuParams.level = row.level + 1
  // 给谁新增子菜单
  menuParams.pid = row.id as number
}
const updatePermission = (row: MenuParams) => {
  dialogVisible.value = true
  // 点击修改按钮:收集已有的菜单的数据进行更新
  Object.assign(menuParams, row)
}
// 确定
const menuForm = ref()
const validatorName = (rule: any, value: any, callback: any) => {
  if (value.trim().length > 0) {
    callback()
  } else {
    callback(new Error('菜单名称不能为空'))
  }
}
const validatorCode = (rule: any, value: any, callback: any) => {
  if (value.trim().length > 0) {
    callback()
  } else {
    callback(new Error('权限数值不能为空'))
  }
}
const rules = {
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  code: [{ required: true, trigger: 'blur', validator: validatorCode }],
}
const save = async () => {
  await menuForm.value.validate()
  const res: any = await reqAddOrUpdateMenu(menuParams)
  if (res.code === 200) {
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: menuParams.id ? '菜单修改成功' : '菜单添加成功',
    })
    getPermissionList()
  } else {
    ElMessage({
      type: 'error',
      message: menuParams.id ? '菜单修改失败' : '菜单添加失败',
    })
  }
}
// 删除
const removePermission = async (id: number) => {
  const res: any = await reqRemoveMenu(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '菜单删除成功',
    })
    getPermissionList()
  } else {
    ElMessage({
      type: 'error',
      message: '菜单删除失败',
    })
  }
}
</script>

<template>
  <el-card>
    <el-table
      border
      :data="permissionList"
      style="width: 100%; margin: 10px 0"
      row-key="id"
    >
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            v-has="`btn.Permission.add`"
            type="primary"
            size="small"
            @click="addPermission(row)"
            :disabled="row.level === 4 ? true : false"
          >
            {{ row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="success"
            size="small"
            @click="updatePermission(row)"
            :disabled="row.level === 1 ? true : false"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定删除${row.name}?`"
            @confirm="removePermission(row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                size="small"
                :disabled="row.level === 1 ? true : false"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      :title="menuParams.id ? '更新菜单' : '添加菜单'"
    >
      <!-- 表单组件:收集新增与已有的菜单的数据 -->
      <el-form :rules="rules" ref="menuForm" :model="menuParams">
        <el-form-item label="名称" prop="name">
          <el-input
            placeholder="请你输入菜单名称"
            v-model="menuParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="code">
          <el-input
            placeholder="请你输入权限数值"
            v-model="menuParams.code"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped></style>

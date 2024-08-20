<script setup lang="ts">
defineOptions({
  name: 'Role',
})
import { ref, reactive, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import {
  reqRoleList,
  reqAddOrUpdateRole,
  reqRemoveRole,
  reqMenuList,
  reqSetPermisstion,
} from '@/api/acl/role'
import {
  Role,
  RoleList,
  RoleListResponseData,
  Menu,
  MenuList,
  MenuListResponseData,
} from '@/api/acl/role/type'
import { useLayOutSettingStore } from '@/store/modules/setting'
let roleList = ref<RoleList>([])
// 分页器
const page = ref<number>(1)
const limit = ref<number>(10)
const total = ref<number>(0)

onMounted(() => {
  getRoleList()
})
const getRoleList = async (pager = 1) => {
  page.value = pager
  const res: RoleListResponseData = await reqRoleList(
    page.value,
    limit.value,
    keyword.value,
  )
  if (res.code == 200) {
    roleList.value = res.data.records
    total.value = res.data.total
  }
}
const sizeChange = () => {
  getRoleList()
}
// 添加职位｜编辑
let roleParams = reactive<Role>({
  id: 0,
  createTime: '',
  updateTime: '',
  roleName: '',
})
let dialogVisite = ref<boolean>(false)
let roleForm = ref()
const addRole = () => {
  dialogVisite.value = true
  Object.assign(roleParams, {
    id: 0,
    roleName: '',
  })
  // 清空上一次表单校验错误结果
  nextTick(() => {
    roleForm.value.clearValidate('roleName')
  })
}
const updateRole = (row: Role) => {
  dialogVisite.value = true
  Object.assign(roleParams, row)
  // 清空上一次表单校验错误结果
  nextTick(() => {
    roleForm.value.clearValidate('roleName')
  })
}
// 验证规则
const validatorRoleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('职位名称长度至少2个字符'))
  }
}
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
// 确定
const save = async () => {
  // 校验规则
  await roleForm.value.validate()
  const res: any = await reqAddOrUpdateRole(roleParams)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新成功' : '添加成功',
    })
    dialogVisite.value = false
    getRoleList(roleParams.id ? page.value : 1)
  }
}

// 分配权限
let drawer = ref<boolean>(false)
let menuList = ref<MenuList>([])
let selectList = ref<number[]>([]) // 准备一个数组:数组用于存储勾选的节点的ID(四级的)
let tree = ref<any>() // 获取tree组件实例
const defaultProps = {
  children: 'children',
  label: 'name',
}

const setPermission = async (row: Role) => {
  // 展示抽屉
  drawer.value = true
  Object.assign(roleParams, row)
  // 发请求
  const res: MenuListResponseData = await reqMenuList(roleParams.id as number)
  if (res.code === 200) {
    menuList.value = res.data
    selectList.value = filterSelectList(menuList.value, [])
  }
}
const filterSelectList = (allData: any, initList: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initList.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectList(item.children, initList)
    }
  })
  return initList
}

// 确定分配权限
const confirmPermissionSet = async () => {
  const roleId = roleParams.id as number
  // 选中节点的ID
  let arr = tree.value.getCheckedKeys()
  // 半选的ID
  let arr1 = tree.value.getHalfCheckedKeys()
  let permissionId = arr.concat(arr1)
  // 下发权限
  let res: any = await reqSetPermisstion(roleId, permissionId)
  if (res.code === 200) {
    // 抽屉关闭
    drawer.value = false
    // 提示信息
    ElMessage({
      type: 'success',
      message: '分配权限成功',
    })
    // 页面刷新
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '分配权限失败',
    })
  }
}

// 删除一个职位
const removeRole = async (id: number) => {
  const res: any = await reqRemoveRole(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getRoleList(roleList.length > 1 ? page.value : page.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

// 搜索
let keyword = ref<string>('')
const search = () => {
  getRoleList()
}

// 重置
const layOutSettingStore = useLayOutSettingStore()
const reset = () => {
  // 直接刷新页面，tabbar左上角的refresh
  layOutSettingStore.refresh = !layOutSettingStore.refresh // 由于main组件对该值进行了监听，会销毁重建当前组件，从而实现刷新页面效果
}
</script>

<template>
  <div>
    <el-card>
      <el-form inline class="form">
        <el-form-item label="职位搜索:">
          <el-input placeholder="请输入搜索职位的关键字" v-model="keyword" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="keyword ? false : true"
            @click="search"
          >
            搜索
          </el-button>
          <el-button type="default" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="addRole">添加职位</el-button>
      <el-table style="margin: 10px 0" border :data="roleList">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column
          label="职位名称"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="265px">
          <template #="{ row }">
            <el-button
              icon="User"
              type="primary"
              size="small"
              @click="setPermission(row)"
            >
              分配权限
            </el-button>
            <el-button
              icon="Edit"
              type="success"
              size="small"
              @click="updateRole(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              @confirm="removeRole(row.id)"
              :title="`你确定删除${row.roleName}?`"
            >
              <template #reference>
                <el-button icon="Delete" type="danger" size="small">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getRoleList"
        @size-change="sizeChange"
        v-model:current-page="page"
        v-model:page-size="limit"
        :page-sizes="[10, 20, 30, 40]"
        :total="total"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
      />
    </el-card>
    <!-- 弹窗组件:添加职位|修改职位-->
    <el-dialog
      v-model="dialogVisite"
      :title="roleParams.id ? '更新职位' : '添加职位'"
    >
      <el-form :model="roleParams" :rules="rules" ref="roleForm">
        <el-form-item label="职位名称" prop="roleName">
          <el-input
            placeholder="请你输入职位名称"
            v-model="roleParams.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="dialogVisite = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
    <!-- 抽屉组件:分配角色 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配菜单与按钮的权限</h4>
      </template>
      <template #default>
        <!-- 树形控件 -->
        <el-tree
          ref="tree"
          :data="menuList"
          :props="defaultProps"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectList"
        ></el-tree>
      </template>
      <template #footer>
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="confirmPermissionSet">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

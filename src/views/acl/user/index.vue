<script setup lang="ts">
defineOptions({
  name: 'User',
})
import { ref, reactive, onMounted, nextTick } from 'vue'
import {
  User,
  UserList,
  UserListResponseData,
  RoleListResponseData,
  RoleList,
  SetRoleData,
} from '@/api/acl/user/type'
import {
  reqUserList,
  reqAddOrUpdateUser,
  removeUserData,
  reqRolesList,
  reqSetUserRole,
  removeBatchUserData,
} from '@/api/acl/user'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { useLayOutSettingStore } from '@/store/modules/setting'

let userList = ref<UserList>([])
// 分页器
const page = ref<number>(1)
const limit = ref<number>(5)
const total = ref<number>(0)

// 添加用户｜修改用户相关
let drawer = ref<boolean>(false)
const userForm = ref()
let userParams = reactive<User>({
  username: '',
  password: '',
  name: '',
})

onMounted(() => {
  getUserList()
})
// 获取表格内容
const getUserList = async (pager = 1) => {
  page.value = pager
  const res: UserListResponseData = await reqUserList(
    page.value,
    limit.value,
    keyword.value,
  )
  userList.value = res.data.records
  total.value = res.data.total
}
// 表格分页变化重新获取表格内容
const sizeChange = () => {
  getUserList()
}

// 添加用户
const addUser = () => {
  drawer.value = true
  // 清空上次输入的数据
  Object.assign(userParams, {
    id: 0,
    username: '',
    password: '',
    name: '',
  })
  // 清理所有字段的表单验证信息。
  nextTick(() => {
    userForm.value.clearValidate('name')
    userForm.value.clearValidate('username')
    userForm.value.clearValidate('password')
  })
}
// 编辑
const updateUser = (row: User) => {
  drawer.value = true
  Object.assign(userParams, row)
  // 清理所有字段的表单验证信息
  nextTick(() => {
    userForm.value.clearValidate('name')
    userForm.value.clearValidate('username')
  })
}
// 保存用户
const save = async () => {
  // 先对整个表单进行校验
  await userForm.value.validate()
  const res: any = await reqAddOrUpdateUser(userParams)
  if (res.code === 200) {
    drawer.value = false
    ElMessage.success(userParams.id ? '修改成功' : '添加成功')
    // 再次获取用户信息(因为下面又使用了页面刷新,所以这里可以不用获取用户信息了)
    // getUserList()
    // 让页面重新刷新（防止修改自己账号而显示错误）
    window.location.reload()
  } else {
    //关闭抽屉
    drawer.value = false
    ElMessage.error(userParams.id ? '修改失败' : '添加失败')
  }
}
// 表单验证规则
const validateUsername = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 8) {
    callback()
  } else {
    callback(new Error('用户名必须大于8位'))
  }
}
const validateName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 8) {
    callback()
  } else {
    callback(new Error('姓名必须大于8位'))
  }
}
const validatePassword = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('密码必须大于等于6位'))
  }
}
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  name: [{ required: true, trigger: 'blur', validator: validateName }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
}

// 分配角色相关
let drawerRole = ref<boolean>(false)
const checkAll = ref(false)
const isIndeterminate = ref(true)
const allRolesList = ref<RoleList>([]) // 存储全部职位的数据
const userRole = ref<RoleList>([]) // 存储当前用户所拥有的职位数据
// 分配角色
const setRole = async (row: User) => {
  let userRolelength =
    row.roleName === '' ? 0 : (row.roleName?.split(',').length ?? 0)
  Object.assign(userParams, row) // 存储已有的用户信息
  const res: RoleListResponseData = await reqRolesList(row.id!)
  if (res.code === 200) {
    allRolesList.value = res.data.allRolesList
    // 修改抽屉内部状态
    checkAll.value = userRolelength === allRolesList.value.length // 是否全选
    isIndeterminate.value =
      userRolelength > 0 && userRolelength < allRolesList.value.length // 修改全选按钮的选中状态, 非全选和全不选时，置为状态[-]
    userRole.value = res.data.assignRoles
    drawerRole.value = true
  }
}
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRolesList.value : []
  isIndeterminate.value = false
}
const handleCheckedRolesChange = (value: string[]) => {
  /* console.log('value', value) // 自动传入
  console.log('userRole', userRole.value) // 在el-checkbox-group上用v-model双向绑定，和value保持一致 */
  const checkedCount = value.length
  checkAll.value = checkedCount === allRolesList.value.length // 是否全选
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRolesList.value.length
}
// 确定分配
const confirmRoleSet = async () => {
  // 收集数据
  const data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => item.id as number),
  }
  const res: any = await reqSetUserRole(data)
  if (res.code === 200) {
    // 提示信息
    ElMessage({ type: 'success', message: '分配职务成功' })
    // 关闭抽屉
    drawerRole.value = false
    // 获取更新完毕用户的信息,更新完毕留在当前页
    getUserList(page.value)
  }
}

// 删除一行用户
const removeUser = async (id: number) => {
  const res: any = await removeUserData(id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getUserList(userList.value.length > 1 ? page.value : page.value - 1)
  }
}

// 批量删除
const toRemoveBatchUsers = ref<UserList>([])
const selectChange = (value: any) => {
  toRemoveBatchUsers.value = value
}
const removeBatchUsers = async () => {
  const toRemoveIdList: any = toRemoveBatchUsers.value.map((item) => item.id)
  const res: any = await removeBatchUserData(toRemoveIdList)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '批量删除成功',
    })
    getUserList(userList.value.length > 1 ? page.value : page.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '批量删除失败',
    })
  }
}

// 搜索功能相关
let keyword = ref<string>('')
// 搜索
const search = () => {
  getUserList() // 获取表格列表时携带上keyword (username)
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
        <el-form-item label="用户名:">
          <el-input placeholder="请输入搜索的用户昵称" v-model="keyword" />
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
      <el-button v-has="`btn.User.add`" type="primary" @click="addUser">
        添加用户
      </el-button>
      <el-button
        type="primary"
        :disabled="toRemoveBatchUsers.length ? false : true"
        @click="removeBatchUsers"
      >
        批量删除
      </el-button>
      <el-table
        style="margin: 10px 0"
        border
        :data="userList"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column
          label="用户姓名"
          prop="name"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户昵称"
          prop="username"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户角色"
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
              @click="setRole(row)"
            >
              分配角色
            </el-button>
            <el-button
              icon="Edit"
              type="success"
              size="small"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              @confirm="removeUser(row.id)"
              :title="`你确定删除${row.name}?`"
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
        @current-change="getUserList"
        @size-change="sizeChange"
        v-model:current-page="page"
        v-model:page-size="limit"
        :page-sizes="[5, 7, 9, 11]"
        :total="total"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
      />
      <!-- 抽屉组件:添加用户表单|修改用户表单-->
      <el-drawer v-model="drawer">
        <template #header>
          <h4>添加用户</h4>
        </template>
        <template #default>
          <el-form :model="userParams" ref="userForm" :rules="rules">
            <el-form-item label="用户姓名" prop="name">
              <el-input
                placeholder="请输入用户姓名"
                v-model="userParams.name"
              />
            </el-form-item>
            <el-form-item label="用户昵称" prop="username">
              <el-input
                placeholder="请输入用户昵称"
                v-model="userParams.username"
              />
            </el-form-item>
            <el-form-item
              label="用户密码"
              v-if="!userParams.id"
              prop="password"
            >
              <el-input
                placeholder="请输入用户密码"
                v-model="userParams.password"
              />
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </template>
      </el-drawer>
      <!-- 抽屉组件:分配角色 -->
      <el-drawer v-model="drawerRole">
        <template #header>
          <h4>分配角色</h4>
        </template>
        <template #default>
          <el-form>
            <el-form-item label="用户昵称">
              <el-input disabled v-model="userParams.username" />
            </el-form-item>
          </el-form>
          <el-form>
            <el-form-item label="职位列表">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >
                全选
              </el-checkbox>
              <el-checkbox-group
                v-model="userRole"
                @change="handleCheckedRolesChange"
              >
                <el-checkbox
                  v-for="role in allRolesList"
                  :key="role.id"
                  :value="role"
                >
                  {{ role.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button @click="drawerRole = false">取消</el-button>
          <el-button type="primary" @click="confirmRoleSet">确定</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

<script setup lang="ts">
defineOptions({
  name: 'Trademark',
})
import { ref, reactive, onMounted } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus'
// 当前页码
let page = ref<number>(1)
// 每一页展示多少条数据
let limit = ref<number>(3)
// 存储已有品牌数据总数
let total = ref<number>(0)
// 存储已有品牌的数据
let trademarkList = ref<Records>([])
//控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false)
// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 获取el-form组件实例
const formRef = ref()
const getHasTrademark = async (pager = 1) => {
  page.value = pager
  let res: TradeMarkResponseData = await reqHasTrademark(
    page.value,
    limit.value,
  )
  // console.log('请求结果', res);
  if (res.code === 200) {
    total.value = res.data.total
    trademarkList.value = res.data.records
    // console.log('品牌列表', trademarkList);
  }
}
onMounted(() => {
  getHasTrademark()
})
// 当下拉菜单发生变化的时候触发次方法
// 这个自定义事件,分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
  // 当前每一页的数据量发生变化的时候，当前页码归1
  getHasTrademark()
}
// 清空对话框
const clearDialog = () => {
  // 清空对话框以前内容
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  clearRules()
}
const clearRules = () => {
  // 清除校验规则
  // console.log('清除校验规则')
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
}
// 添加
const addTrademark = () => {
  // console.log('添加')
  clearDialog()
  // 显示对话框
  dialogFormVisible.value = true
}
// 修改
const updateTrademark = (row: TradeMark) => {
  // console.log('修改')
  // 显示对话框
  dialogFormVisible.value = true
  trademarkParams.id = row.id as number
  trademarkParams.tmName = row.tmName as string
  trademarkParams.logoUrl = row.logoUrl as string
  //上面三行也可以用ES6的合并对象语法
  // Object.assign(trademarkParams, row)
  clearRules()
}
// 删除
const removeTrademark = async (id: number) => {
  const res: any = await reqDeleteTrademark(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    /* 重新获取数据
     * trademarkList.value.length > 1 ? page.value : page.value - 1: 这是当前页面上品牌数量。如果当前页面上只有一个品牌，那么删除品牌后，页码应该减1，所以传递当前页码 page.value - 1 作为参数
     * page.value: 这是当前的页码。如果当前页面上仍有多个品牌，那么删除品牌后依旧停留在当前页，所以传递当前页码 page.value 作为参数
     * page.value -1: 如果当前页面上只有一个品牌被删除，那么删除操作后当前页面将没有品牌。此时将页码减少 1，即切换到上一页以确保不会出现空白页
     */
    getHasTrademark(
      trademarkList.value.length > 1 ? page.value : page.value - 1,
    )
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败',
    })
  }
}
// 对话框底部取消按钮
const cancel = () => {
  // 对话框隐藏
  dialogFormVisible.value = false
  clearDialog()
}
const confirm = async () => {
  // 校验表单信息
  await formRef.value.validate()
  // 发送请求
  let res: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (res.code === 200) {
    // 添加成功, 弹出提示
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
    // 再次发出请求获取全部数据（如果修改，就留在当前页；如果是添加就返回第一页）
    getHasTrademark(trademarkParams.id ? page.value : 1)
  } else {
    // 添加失败，弹出提示
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
  // 隐藏对话框
  dialogFormVisible.value = false
  clearDialog()
}

const validatorTmName = (_rule: any, value: any, callback: any) => {
  // 是当表单元素触发blur时候,会触发此方法
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callback()
  } else {
    //校验未通过返回的错误的提示信息
    callback(new Error('品牌名称位数大于等于两位'))
  }
}
const validatorLogoUrl = (_rule: any, value: any, callback: any) => {
  // 如果图片上传
  if (value) {
    callback()
  } else {
    callback(new Error('请上传图片'))
  }
}
// 表单校验规则对象
const rules = {
  tmName: [
    // required:这个字段务必校验,表单项前面出来五角星
    // trigger:代表触发校验规则时机[blur、change]
    { required: true, trigger: 'blur', validator: validatorTmName },
  ],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}
// 上传图片之前触发的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
  // 要求:上传文件格式png|jpg|gif 4M
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('上传文件大小不能超过4M')
      return false
    }
  } else {
    ElMessage.error('上传文件格式只能是png|jpg|gif')
    return false
  }
}
// 图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  _uploadFile,
) => {
  // console.log('图片上传成功钩子触发')
  // response: 即为当前这次上传图片post请求服务器返回的数据
  // 收集上传图片的地址,添加一个新的品牌的时候带给服务器
  trademarkParams.logoUrl = response.data
  // 图片上传成功, 清除掉对应图片校验规则
  formRef.value.clearValidate('logoUrl')
}
</script>

<template>
  <div>
    <el-card>
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button
        v-has="`btn.Trademark.add`"
        icon="Plus"
        size="default"
        type="primary"
        @click="addTrademark"
      >
        添加品牌
      </el-button>
      <!-- 表格组件，用于展示已有的数据 -->
      <!-- 
          table
          ---border:是否有纵向的边框
          table-column
          ---label：某一个列表
          ---width：设置这一列的宽度
          ---align：设置这一列对齐方式
        -->
      <el-table style="margin: 10px 0" border :data="trademarkList">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <!-- <el-table-column label="品牌名称" prop="tmName"></el-table-column> -->
        <el-table-column label="品牌名称">
          <template #default="{ row }">
            <pre style="color: #a0a0a0">{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO" prop="logoUrl">
          <template #default="{ row }">
            <img
              :src="
                row.logoUrl.substring(0, 7) === 'http://'
                  ? `${row.logoUrl}`
                  : `http://${row.logoUrl}`
              "
              alt="未有图片"
              style="width: 30px; height: 30px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            >
              修改
            </el-button>

            <el-popconfirm
              :title="`您确定要删除${row.tmName}?`"
              width="250px"
              @confirm="removeTrademark(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <!-- 
        pagination
        ---v-model:current-page：设置当前分页器页码
        ---v-model:page-size:设置每一也展示数据条数
        ---page-sizes：每页显示个数选择器的选项设置
        ---background:背景颜色
        ---layout：分页器6个子组件布局的调整 "->"把后面的子组件顶到右侧
      -->
      <el-pagination
        @current-change="getHasTrademark"
        @size-change="sizeChange"
        v-model:current-page="page"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
      />
    </el-card>
    <!-- 对话框组件:在添加品牌与修改已有品牌的业务时候使用结构 -->
    <!-- v-model:属性用户控制对话框的显示与隐藏的 true显示 false隐藏
      title:设置对话框左上角标题 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        ref="formRef"
        :rules="rules"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            v-model="trademarkParams.tmName"
            placeholder="请输入品牌名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- upload组件属性:action图片上传路径书写/api,代理服务器不发送这次post请求 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

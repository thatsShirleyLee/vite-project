<script setup lang="ts">
defineOptions({
  name: 'SpuForm',
})
import {
  Spu,
  AllTradeMark,
  SpuImageList,
  AllSaleAttr,
  SpuSaleAttrList,
  Trademark,
  SpuImage,
  SaleAttr,
  SpuSaleAttr,
  SpuSaleAttrValue,
} from '@/api/product/spu/type'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqAllSaleAttr,
  reqSpuSaleAttrList,
  reqAddOrUpdateSpu,
} from '@/api/product/spu'
import { ref, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import type { UploadProps } from 'element-plus'
const emit = defineEmits(['changeScene'])
const cancel = () => {
  // 通知父组件切换场景
  emit('changeScene', { flag: 0, params: 'update' })
}
// 存储已有的SPU对象
let spuParams = ref<Spu>({
  category3Id: '', // 收集三级分类的ID
  spuName: '', // SPU的名字
  description: '', // SPU的描述
  tmId: '', // 品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
})
// 存储全部品牌
let allTradeMark = ref<Trademark[]>([])
// 存储该SPU的已有全部图标
let spuImageList = ref<SpuImage[]>([])
// 存储全部销售属性
let allSaleAttr = ref<SaleAttr[]>([])
// 存储该SPU的已有属性
let spuSaleAttrList = ref<SpuSaleAttr[]>([])

// 将来收集还未选择的销售属性的id与属性的名字
const saleAtrIdAndValueName = ref('')
// 计算出当前spu还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  const unSelectArr = allSaleAttr.value.filter((item) => {
    return spuSaleAttrList.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})

// 从父组件拿去当前选中行的spu数据
const initSpuParams = async (spu: Spu) => {
  // spu:即为父组件传递过来的已有的SPU对象[不完整]
  spuParams.value = spu
  // 获取全部可选品牌
  const res1: AllTradeMark = await reqAllTradeMark()
  allTradeMark.value = res1.data
  // 获取该SPU的已有全部图标
  const res2: SpuImageList = await reqSpuImageList(spuParams.value.id as number)
  spuImageList.value = res2.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  // 获取全部可选销售属性
  const res3: AllSaleAttr = await reqAllSaleAttr()
  allSaleAttr.value = res3.data
  // 获取该SPU的已有全部销售属性
  const res4: SpuSaleAttrList = await reqSpuSaleAttrList(
    spuParams.value.id as number,
  )
  spuSaleAttrList.value = res4.data
}
// 控制照片放大对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
// 存储预览图片地址
const dialogImageUrl = ref('')
// 照片墙点击预览按钮的时候触发的钩子
const handlePictureCardPreview = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
// 照片墙删除文件钩子
const handleRemove = () => {}
// 上传图片之前触发的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 > 10) {
      ElMessage.error('图片大小不能超过10M!')
      return false
    }
    return true
  } else {
    ElMessage.error('图片格式只能是jpg或png或gif!')
    return false
  }
}
// 添加属性
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAtrIdAndValueName.value.split(':')
  // 准备一个新的销售属性对象，将来带给服务器
  const newSaleAttr: SpuSaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  // 追加到数组中
  spuSaleAttrList.value.push(newSaleAttr)
  // 清空收集的数据
  saleAtrIdAndValueName.value = ''
}
//准备一个数组，将来存储对应的组件实例el-input
const inputArr = ref<any>([])
// input失去焦点的事件回调
const toLook = (row: SpuSaleAttr) => {
  // 整理收集的属性的ID与属性值的名字
  const { baseSaleAttrId, saleAttrValue } = row
  // 整理成服务器需要的属性值形式
  let newSaleAttrValue: SpuSaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }
  // 非法情况判断
  if ((saleAttrValue as string).trim() == '') {
    ElMessage.error('属性值不能为空')
    return
  }
  // 判断属性值是否在数组当中存在
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })
  if (repeat) {
    ElMessage.error('属性值重复')
    return
  }
  // 追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  // 切换为查看模式
  row.flag = false
}
// 属性值按钮的点击事件
const toEdit = (row: SpuSaleAttr, $index: number) => {
  //点击按钮的时候,input组件不就不出来->编辑模式
  row.flag = true
  row.saleAttrValue = ''
  nextTick(() => {
    //获取焦点
    inputArr.value[$index].focus()
  })
}
const save = async () => {
  // 照片墙的数据
  spuParams.value.spuImageList = spuImageList.value.map((item: any) => {
    return {
      imgName: item.name, // 图片的名字
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  // 整理销售属性的数据
  spuParams.value.spuSaleAttrList = spuSaleAttrList.value
  let res: any = await reqAddOrUpdateSpu(spuParams.value)
  if (res.code === 200) {
    ElMessage.success(spuParams.value.id ? '更新成功' : '添加成功')
    // 通知父组件切换场景为0
    emit('changeScene', {
      flag: 0,
      params: spuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage.error(spuParams.value.id ? '更新失败' : '添加失败')
  }
}
// 添加一个新的SPU初始化请求方法
const initAddSpu = async (c3Id: number | string) => {
  // 清空数据
  Object.assign(spuParams.value, {
    category3Id: '', // 收集三级分类的ID
    spuName: '', // SPU的名字
    description: '', // SPU的描述
    tmId: '', // 品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
  })
  // 清空照片
  spuImageList.value = []
  // 清空销售属性
  spuSaleAttrList.value = []
  saleAtrIdAndValueName.value = ''
  // 存储三级分类的ID
  spuParams.value.category3Id = c3Id
  // 获取全部品牌的数据
  const res1: AllTradeMark = await reqAllTradeMark()
  const res2: AllSaleAttr = await reqAllSaleAttr()
  // 存储数据
  allTradeMark.value = res1.data
  allSaleAttr.value = res2.data
}
defineExpose({ initSpuParams, initAddSpu })
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="spuParams.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select
        placeholder="请选择品牌"
        style="width: 180px"
        v-model="spuParams.tmId"
      >
        <el-option
          v-for="item in allTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        placeholder="请输入SPU描述"
        type="textarea"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload
        list-type="picture-card"
        v-model:file-list="spuImageList"
        action="http://sph-api.atguigu.cn/admin/product/fileUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        style="width: 180px"
        v-model="saleAtrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : '没有可选属性'
        "
      >
        <el-option
          :value="`${item.id}:${item.name}`"
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
      <el-button
        icon="Plus"
        type="primary"
        style="margin-left: 10px"
        :disabled="saleAtrIdAndValueName ? false : true"
        @click="addSaleAttr"
      >
        添加属性
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-table border :data="spuSaleAttrList">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="销售属性名字"
          width="120px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row, $index }">
            <el-tag
              style="margin: 0 5px"
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="item.id"
              closable
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.flag === true"
              :ref="(vc: any) => (inputArr[$index] = vc)"
              v-model="row.saleAttrValue"
              size="small"
              placeholder="请你输入属性值"
              style="width: 100px"
              @blur="toLook(row)"
            />
            <el-button
              v-else
              size="small"
              @click="toEdit(row, $index)"
              icon="Plus"
              type="primary"
              style="margin-left: 5px"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template #="{ $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="spuSaleAttrList.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        :disabled="spuSaleAttrList.length > 0 ? false : true"
        @click="save"
      >
        保存
      </el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>

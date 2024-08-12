<script setup lang="ts">
defineOptions({
  name: 'Category',
})
</script>

<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select>
          <el-option label="北京"></el-option>
          <el-option label="深圳"></el-option>
          <el-option label="广州"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select>
          <el-option label="北京"></el-option>
          <el-option label="深圳"></el-option>
          <el-option label="广州"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select>
          <el-option label="北京"></el-option>
          <el-option label="深圳"></el-option>
          <el-option label="广州"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss"></style>

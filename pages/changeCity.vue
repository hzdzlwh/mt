<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <i-select></i-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot></hot>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category></category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/isselect'
import hot from '@/components/changeCity/hot'
import Category from '@/components/changeCity/category'

export default {
  data() {
    return {

    }
  },
  methods: {

  },
  components: {
    iSelect,
    hot,
    Category
  }
}
</script>

<style>

</style>

<template>
  <el-container class="layout-default">
    <el-header style="height:auto;">
      <m-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer style="height:100%"><m-footer /></el-footer>
  </el-container>
</template>

<script>
import MHeader from '../components/public/header'
import MFooter from '../components/public/footer'

export default {
  components: {
    MHeader,
    MFooter
  }
}
</script>


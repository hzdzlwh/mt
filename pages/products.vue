<template>
  <el-row class="page-product">
    <el-col :span="19">
      <Crumbs :keyword="keyword"></Crumbs>
      <Categroy></Categroy>
      <List></List>
    </el-col>
    <el-col :span="5">
      <Amap></Amap>
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '~/components/products/crumbs'
import Categroy from '~/components/products/categroy'
import List from '~/components/products/list'
import Amap from '~/components/public/map'

export default {
  data() {
    return {
      keyword: ''
    }
  },
  async asyncData(ctx) {
    let keyword = ctx.query.keyword
    let city = ctx.store.state.geo.position.city
    let { status, data: { count, pois }} = await ctx.$axios.get('/search/resultsByKeywords', {
      params: {
        keyword,
        city
      }
    })
    let { status: status2, data: { areas, types }} = await ctx.$axios.get('/categroy/crumbs', {
      params: {
        city
      }
    })
    return {
      keyword,
      count,
      pois
    }
    if (status === 200 && count > 0 && status2 === 200) {
      return {
        keyword,
        count,
        pois
      }
    }
  },
  methods: {

  },
  components: {
    Crumbs,
    Categroy,
    List,
    Amap
  }
}
</script>

<style lang="scss">
@import "~/assets/css/products/index.scss";
</style>

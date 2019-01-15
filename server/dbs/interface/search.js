import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({
  prefix: '/search'
})

const sign = 'abcd'

router.get('/top', async (ctx) => {
  let { status, data: { top }} = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status === 200 ? ['西湖', '湘湖', '西溪', '龙井'] : ['西湖', '湘湖', '西溪', '龙井']
  }
})

router.get('/hotPlace', async (ctx) => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  let { status, data: { result }} = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    params: {
      sign,
      city: city
    }
  })
  ctx.body = {
    result: status === 200 ? ['西湖', '湘湖', '西溪', '龙井'] : []
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const { city, keyword } = ctx.query
  let { status, data: { count, pois }} = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword
    }
  })
  console.log(status, count, pois)
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})

router.get('/products', async (ctx) => {
  let keyword = ctx.query.keyword || '旅游'
  let city = ctx.query.city || '北京'
  let { status, data: { product, more } } = await axios.get('http://cp-tools.cn/search/products', {
    params: {
      keyword,
      city,
      sign
    }
  })
  if (status === 200) {
    ctx.body = {
      product: {biz_ext: {}},
      // 判断是否登录
      more: ctx.isAuthenticated() ? [{photos:[{url:'aa',title:'bb'}],name:'cc',biz_ext:{ticket_ordering:1,cost:9},deadline:'2019:01:13'}] : [],
      login: ctx.isAuthenticated()
    }
  } else {
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  }
})

export default router


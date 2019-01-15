import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({
  prefix: '/geo'
})

const sign = 'abcd'

router.get('/getPosition', async (ctx) => {
  let { status, data: {province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province: '浙江',
      city: '杭州'
    }
  } else {
    ctx.body = {
      province: '浙江',
      city: '杭州'
    }
  }
})

router.get('/province', async (ctx) => {
  let { status, data: { province }} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
    province: []
  }
})

router.get('/menu', async (ctx) => {
  let { status, data: { menu }} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      menu: [
        {
          type: 'food',
          name: '美食',
          child: [
            {
              title: '美食',
              child: ['代金券', '甜点饮品']
            }
          ]
        },
        {
          type: 'takeout',
          name: '外卖',
          child: [
            {
              title: '外卖',
              child: ['美团外卖']
            }
          ]
        },
        {
          type: 'hotel',
          name: '酒店',
          child: [
            {
              title: '酒店星级',
              child: ['经济型', '舒适型']
            }
          ]
        }
      ]
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

router.get('/city', async (ctx) => {
  ctx.body = {
    city: [
      { name: '北京'},
      { name: '上海'},
      { name: '广州'},
      { name: '深圳'},
      { name: '杭州'},
      { name: '苏州'},
      { name: '南京'},
      { name: '郑州'},
      { name: '武汉'},
      { name: '厦门'},
      { name: '漯河'},
      { name: '周口'}
    ]
  }
})

export default router


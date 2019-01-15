import Router from 'koa-router'
import axios from './utils/axios'
import md5 from 'crypto-js/md5'
import sign from './utils/sign'

let router = new Router({ prefix: '/order'})

router.post('/createOrder', async ctx => {
  ctx.body = {
    code: 0
  }
})

export default router
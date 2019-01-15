import Router from 'koa-router'
import axios from './utils/axios'
import md5 from 'crypto-js/md5'
import sign from './utils/sign'
import Cart from '../models/cart'

let router = new Router({prefix: '/cart'})

router.post('/create', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    let time = Date()
    let cartNo = md5(Math.random() * 1000 + time).toString()
    let {params:{id,detail}} = ctx.request.body
    let cart = new Cart({
      id,
      cartNo,
      time,
      user: ctx.session.passport.user,
      detail
    })
    let request = await cart.save()
    if (request) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})

router.post('/getCart', async ctx => {
  let { id } = ctx.request.body
  try {
    let result = await Cart.findOne({cartNo:id})
    console.log(result)
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

export default router
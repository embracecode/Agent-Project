const Router = require('@koa/router')

const router = new Router()

// 用户相关的

const user = require('./controller/user')
// 登录接口
router.post('/wxlogin', user.wxLogin)

//大模型对话的
const chat = require('./controller/chat')
// 对话流式输出
router.post('/chatmessage', chat.chatMessage)
// 图片解释
router.post('/upload', require('./controller/img').upload)


module.exports = router
const Koa = require('koa')

const app = new Koa()

const json = require('koa-json') // 将http数据相应转化成json格式

const bodyParser = require('koa-bodyparser') // 解析http请求的消息体

const cors = require('@koa/cors')

const router = require('./router')


app.use(json())
app.use(bodyParser())
app.use(cors())


// allowedMethods 请求方法不对时报错提示
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('3000端口启动成功!');

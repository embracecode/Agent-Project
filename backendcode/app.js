const Koa = require('koa')

const app = new Koa()
const path = require('path');

const json = require('koa-json') // 将http数据相应转化成json格式

const bodyParser = require('koa-bodyparser') // 解析http请求的消息体

const cors = require('@koa/cors')

const router = require('./router')

const serve = require('koa-static'); // 引入静态资源中间件


app.use(json())
app.use(bodyParser())
app.use(cors())
app.use(serve(path.join(__dirname, 'utils/images'))); // 将 utils/images 目录作为静态资源目录，前端可以通过 /images/filename.png 访问图片

// allowedMethods 请求方法不对时报错提示
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
console.log('3000端口启动成功!');

import { createApp } from 'vue'

import App from './App.vue'
import 'amfe-flexible' // 动态改变跟字体大小

import {
    router,
} from './router'

import { Button,
    Image as VanImage,
    Uploader,
    Field,
    CellGroup,
    NavBar,
    Picker,
    Popup,
} from 'vant'

import 'vant/lib/index.css'

const app = createApp(App)
app.use(router)
app.use(Button)
app.use(VanImage)
app.use(Uploader)
app.use(Field)
app.use(CellGroup)
app.use(NavBar)
app.use(Picker)
app.use(Popup)
app.mount('#app')

import { reactive, computed, readonly, inject, h } from 'vue'
/**
 * RouterView 组件
 * 根据当前路径动态渲染匹配的组件
 */
const RouterView = {
  name: 'RouterView',
  setup() {
    const router = inject(ROUTER_KEY)
    const route = inject(ROUTE_KEY)
    // 根据当前路径找到组件，使用 computed 使其响应式
    const component = computed(() => router.routeMap[route.path])
    return () => component.value ? h(component.value) : null
  }
}

/**
 * RouterLink 组件
 * @param {String} to - 目标路径
 */
const RouterLink = {
  name: 'RouterLink',
  props: {
    to: { type: String, required: true }
  },
  setup(props, { slots }) {
    const router = inject(ROUTER_KEY)
    const navigate = (e) => {
      e.preventDefault()
      router.push(props.to)
    }
    const href = computed(() => router.mode === 'hash' ? `#${props.to}` : props.to)
    return () => h('a', { href: href.value, onClick: navigate }, slots.default())
  }
}
// 内部注入的 key
const ROUTER_KEY = Symbol('router')
const ROUTE_KEY = Symbol('route')

/**
 * 创建路由实例
 * @param {Object} options - { mode, routes }
 * @returns {Object} router 实例
 */
export function createRouter(options) {
  const { mode = 'hash', routes = [] } = options

  // 构建路由映射表 { path: component }
  const routeMap = routes.reduce((map, route) => {
    map[route.path] = route.component
    return map
  }, {})

  // 创建响应式的 currentRoute 对象
  const currentRoute = reactive({
    path: '',     // 当前路径
    query: {},    // 暂不实现解析
    params: {},   // 暂不实现
    fullPath: ''
  })

  // 更新路由的方法
  const updateRoute = (path) => {
    currentRoute.path = path
    currentRoute.fullPath = path
    // 触发视图更新（依赖 currentRoute 的组件会自动重新渲染）
  }

  // 根据 mode 监听 URL 变化
  const setupListeners = () => {
    if (mode === 'hash') {
      const getHashPath = () => location.hash.slice(1) || '/'
      const handleHashChange = () => updateRoute(getHashPath())
      window.addEventListener('load', handleHashChange)
      window.addEventListener('hashchange', handleHashChange)
      // 初始化
      handleHashChange()
    } else if (mode === 'history') {
      const getPath = () => location.pathname
      const handlePopState = () => updateRoute(getPath())
      window.addEventListener('load', handlePopState)
      window.addEventListener('popstate', handlePopState)
      handlePopState()
    }
  }

  // 路由跳转方法
  const push = (to) => {
    if (mode === 'hash') {
      location.hash = to
    } else {
      history.pushState(null, '', to)
      updateRoute(to)  // 手动更新，因为 popstate 不会自动触发
    }
  }

  const replace = (to) => {
    if (mode === 'hash') {
      const href = location.href.replace(/#.*$/, '#') + to
      location.replace(href)
    } else {
      history.replaceState(null, '', to)
      updateRoute(to)
    }
  }

  // 安装插件
  const install = (app) => {
    // 1. 提供 router 实例和只读的 currentRoute
    app.provide(ROUTER_KEY, router)
    app.provide(ROUTE_KEY, readonly(currentRoute))

    // 2. 全局挂载 $router 和 $route（兼容选项式 API）
    // 注意：使用 Object.defineProperty 避免覆盖已有只读属性
    Object.defineProperty(app.config.globalProperties, '$router', {
      get: () => router,
      configurable: true
    })
    Object.defineProperty(app.config.globalProperties, '$route', {
      get: () => currentRoute,
      configurable: true
    })

    // 3. 注册全局组件
    app.component('RouterView', RouterView)
    app.component('RouterLink', RouterLink)
  }
  const getRoutes = () => {
    return routes.map(route => ({
      path: route.path,
      name: route.name,
      meta: route.meta,
      components: { default: route.component }
    }))
  }

  const router = {
    install,
    push,
    replace,
    getRoutes,
    currentRoute: readonly(currentRoute),  // 对外暴露只读
    routeMap,      // 内部使用
    mode
  }

  // 启动路由监听
  setupListeners()

  return router
}


// 组合式 API 函数
export function useRouter() {
  const router = inject(ROUTER_KEY)
  if (!router) throw new Error('useRouter must be used after app.use(router)')
  return router
}

export function useRoute() {
  const route = inject(ROUTE_KEY)
  if (!route) throw new Error('useRoute must be used after app.use(router)')
  return route
}

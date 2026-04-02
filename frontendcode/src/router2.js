let Vue = null

class HistoryRoute {
    constructor() {
        this.current = null
    }
}

class VueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash'
        this.routes = options.routes || []
        this.routeMap = this.createRouteMap(this.routes)
        this.history = new HistoryRoute()
        this.init()
    }
    createRouteMap(routes) {
        return routes.reduce((map, route) => {
            map[route.path] = route.component
            return map
        }, {})
    }
    // hash
    onHashChange() {
        this.history.current = location.hash.slice(1) || '/'
    }
    // browser history
    onPopState() {
        this.history.current = location.pathname || '/'
    }
    init() {
        if (this.mode === 'hash') {
            window.addEventListener('load', this.onHashChange.bind(this))
            window.addEventListener('hashchange', this.onHashChange.bind(this))
        } else {
            window.addEventListener('load', this.onPopState.bind(this))
            window.addEventListener('popstate', this.onPopState.bind(this))
        }
    }
}

// 因为用的地方不一样 在实例上用的 所以挂载到了原型上 （vue2）
// VueRouter.prototype.install = function(_Vue) {
//     Vue = _Vue
//     Vue.mixin({
//         beforeCreate() {
//             console.log('beforeCreate', this)
//             if (this.$options.router) {
//                 this._root = this
//                 this._router = this.$options.router
//                 Vue.util.defineReactive(this, '_route', this._router.history.current)
//             } else {
//                 this._router = this.$parent && this.$parent._router
//             }
//             Object.defineProperty(this, '$route', {
//                 get() {
//                     return this._route
//                 }
//             })
//             Object.defineProperty(this, '$router', {
//                 get() {
//                     return this._router
//                 }
//             })
//         }
//     })
//     Vue.component('router-link', {
//         props: {
//             to: {
//                 type: String,
//                 required: true
//             }
//         },
//         render(h) {
//             let mode = this._self._router.mode
//             return h('a', {
//                 attrs: {
//                     href: mode === 'hash' ? `#${this.to}` : this.to,
//                     style: {
//                         display: 'block'
//                     }
//                 }
//             }, this.$slots.default)
//         }
//     })
//     Vue.component('router-view', {
//         render(h) {
//             const current = this._self._router.history.current
//             const component = this._self._router.routeMap[current]
//             return h(component)
//         }
//     })
// }

export {
    VueRouter
}
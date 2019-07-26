// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        // path: '/dashboard',
        // name: 'dashboard',
        // redirect: '/dashboard/workplace',
        // component: RouteView,
        // meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse },
        // children: [
        //   {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: 'Pages.Administration' }
        //   },
        // ]
      },
      
      // 工艺管理
      {
        path: '/technology',
        name: 'technology',
        redirect: '/technology/technologyinfo',
        component: RouteView,
        meta: { title: '工艺管理', icon: 'setting' },
        children: [
          {
            path: '/technology/technologyinfo',
            name: 'technologyinfo',
            component: () => import('@/views/exception/404'),
            meta: { title: '工艺管理', icon: 'profile', permission: 'Pages' }
          },
        ]
      },
      
      // 生产计划
      {
        path: '/plan',
        name: 'plan',
        redirect: '/plan/planmanage',
        component: RouteView,
        meta: { title: '生产计划', icon: 'setting' },
        children: [
          {
            path: '/plan/planmanage',
            name: 'planmanage',
            component: () => import('@/views/exception/404'),
            meta: { title: '生产计划', icon: 'profile', permission: 'Pages' }
          },
          {
            path: '/plan/devicecheck',
            name: 'devicecheck',
            component: () => import('@/views/exception/404'),
            meta: { title: '设备点检', icon: 'profile', permission: 'Pages' }
          },
        ]
      },

      // dashboard
      {
        path: '/Rack',
        name: 'Rack',
        component: RouteView,
        meta: { title: '料架管理', icon: bxAnaalyse , permission: 'Pages.Rackmanage'},
        children: [
          {
            path: '/Rack/rackmanage',
            name: 'rackmanage',
            component: () => import('@/views/exception/404'),
            meta: { title: '料架管理', keepAlive: true, permission: 'Pages.Rackmanage' }
          },
          {
            path: '/Rack/racklog',
            name: 'racklog',
            component: () => import('@/views/exception/404'),
            meta: { title: '料架补料记录', keepAlive: true, permission: 'Pages.Rackmanage' }
          },
          {
            path: '/Rack/linestockmanage',
            name: 'linestockmanage',
            component: () => import('@/views/exception/404'),
            meta: { title: '线边库管理', keepAlive: true, permission: 'Pages.Rackmanage' }
          },
          {
            path: '/Rack/linestocklog',
            name: 'sinestocklog',
            component: () => import('@/views/exception/404'),
            meta: { title: '线边库历史台账', keepAlive: true, permission: 'Pages.Rackmanage' }
          },
        ]
      },
      // dashboard
      {
        path: '/stockmanage',
        name: 'stockmanage',
        component: RouteView,
        meta: { title: '仓库管理', icon: bxAnaalyse , permission: 'Pages.StockManager'},
        children: [
          {
            path: '/dashboard/stockin',
            name: 'stockin',
            component: () => import('@/views/exception/404'),
            meta: { title: '原料入库', keepAlive: true, permission: 'Pages.StockManager' }
          },
          {
            path: '/dashboard/stockout',
            name: 'stockout',
            component: () => import('@/views/exception/404'),
            meta: { title: '原料出库', keepAlive: true, permission: 'Pages.StockManager' }
          },
          {
            path: '/dashboard/stockquery',
            name: 'stockquery',
            component: () => import('@/views/exception/404'),
            meta: { title: '库存查询', keepAlive: true, permission: 'Pages.StockManager' }
          },
          {
            path: '/dashboard/stocklog',
            name: 'stocklog',
            component: () => import('@/views/exception/404'),
            meta: { title: '库存记录', keepAlive: true, permission: 'Pages.StockManager' }
          },
        ]
      },
      // basedata
      {
        path: '/basedata',
        name: 'basedata',
        // redirect: '/basedata/workplace',
        component: RouteView,
        meta: { title: '基础数据', icon: 'setting' },
        children: [
          {
            path: '/basedata/materials',
            name: 'materials',
            component: () => import('@/views/exception/404'),
            meta: { title: '物料信息', icon: 'profile', permission: 'Pages' }
          },
          {
            path: '/basedata/turnoverbox',
            name: 'turnoverbox',
            component: () => import('@/views/exception/404'),
            meta: { title: '周转容器', icon: 'profile', permission: 'Pages' }
          },
          {
            path: '/basedata/warehouse',
            name: 'warehouse',
            component: () => import('@/views/exception/404'),
            meta: { title: '仓库信息', icon: 'profile', permission: 'Pages' }
          },
          {
            path: '/basedata/warehousearea',
            name: 'warehousearea',
            component: () => import('@/views/exception/404'),
            meta: { title: '库区信息', icon: 'profile', permission: 'Pages' }
          },
          {
            path: '/basedata/storagelocation',
            name: 'storagelocation',
            component: () => import('@/views/exception/404'),
            meta: { title: '库位信息', icon: 'profile', permission: 'Pages' }
          },
          {
            path: '/basedata/systemconfig',
            name: 'systemconfig',
            component: () => import('@/views/exception/404'),
            meta: { title: '系统配置', icon: 'profile', permission: 'Pages' }
          },
        ]
      },
      
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: 'Pages' },
        hidden: true,
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: 'Pages' }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: 'Pages' }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: 'Pages' }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '账号管理', icon: 'user', keepAlive: true, permission: 'Pages' },
        children: [
          // {
          //   path: '/account/center',
          //   name: 'center',
          //   component: () => import('@/views/account/center/Index'),
          //   meta: { title: '个人中心', keepAlive: true, permission: 'Pages' }
          // },
          {
            path: '/account/noticeIcon',
            name: 'noticeIcon',
            component: () => import('@/views/account/noticeIcon/Index'),
            meta: { title: '消息中心', hideHeader: true, permission: 'Pages' },
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: 'Pages' },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: 'Pages' }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: 'Pages' }
              },
            ]
          }
        ]
      },
      // {
      //   path: '/wechat',
      //   name: 'wechat',
      //   component: PageView,
      //   redirect: '/wechat',
      //   meta: { title: '微信管理', icon: 'setting', permission: 'Pages' },
      //   children: [
      //     {
      //       path: '/wechat/wechat-config',
      //       name: 'wechat-config',
      //       component: () => import('@/views/wechat/wechat-config/WeChatConfig'),
      //       meta: { title: '微信设置', hideHeader: true, permission: 'Pages' },
      //     },
      //   ]
      // },
      {
        path: '/admin',
        name: 'admin',
        component: PageView,
        redirect: '/admin',
        meta: { title: '系统管理', icon: 'setting', permission: 'Pages' },
        children: [
          // {
          //   path: '/admin/organization',
          //   name: 'organization',
          //   component: () => import('@/views/admin/organization/OrganizationList'),
          //   meta: { title: '组织机构管理', hideHeader: true, permission: 'Pages' },
          // },
          {
            path: '/admin/role',
            name: 'role',
            component: () => import('@/views/admin/roles/RoleList'),
            meta: { title: '角色管理', hideHeader: true, permission: 'Pages' },
          },
          {
            path: '/admin/user',
            name: 'user',
            component: () => import('@/views/admin/users/UserList'),
            meta: { title: '用户管理', hideHeader: true, permission: 'Pages' },
          },
          // {
          //   path: '/admin/ui-customization',
          //   name: 'ui-customization',
          //   component: () => import('@/views/admin/ui-customization/UiCustomization'),
          //   meta: { title: 'UI设置', hideHeader: true, permission: 'Pages' },
          // },
          // {
          //   path: '/admin/setting',
          //   name: 'setting',
          //   component: () => import('@/views/admin/settings/Setting'),
          //   meta: { title: '设置', hideHeader: true, permission: 'Pages' },
          // },
        ]
      },
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/account',
    component: UserLayout,
    redirect: '/account/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/account/login/Index')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/account/register/Index')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/account/register/RegisterResult')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]

import { AppRouteRecord } from '@/types/router'

/**
 * 制度管理模块路由
 */
export const policyRoutes: AppRouteRecord = {
  path: '/policy',
  name: 'Policy',
  component: '/index/index',
  meta: {
    title: 'menus.policy.title',
    icon: 'ri:file-text-line',
    roles: ['R_SUPER', 'R_ADMIN']
  },
  children: [
    {
      path: 'list',
      name: 'PolicyList',
      component: '/policy/list',
      meta: {
        title: 'menus.policy.list',
        icon: 'ri:file-list-line',
        keepAlive: true,
        roles: ['R_SUPER', 'R_ADMIN']
      }
    }
  ]
}

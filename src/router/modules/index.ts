import { AppRouteRecord } from '@/types/router'
import { dashboardRoutes } from './dashboard'
import { systemRoutes } from './system'
import { policyRoutes } from './policy'
import { exceptionRoutes } from './exception'
// 暂时隐藏演示性模块，只保留实际业务功能
// import { templateRoutes } from './template'
// import { widgetsRoutes } from './widgets'
// import { examplesRoutes } from './examples'
// import { articleRoutes } from './article'
// import { resultRoutes } from './result'
// import { safeguardRoutes } from './safeguard'
// import { helpRoutes } from './help'

/**
 * 导出所有模块化路由
 * 只保留对应后端功能的模块
 */
export const routeModules: AppRouteRecord[] = [
  dashboardRoutes, // 仪表盘（保留）
  systemRoutes, // 系统管理（用户、部门）
  policyRoutes, // 制度管理（新增）
  exceptionRoutes // 异常页面（保留，用于404/500等）
  // 暂时隐藏演示性模块
  // templateRoutes,
  // widgetsRoutes,
  // examplesRoutes,
  // articleRoutes,
  // resultRoutes,
  // safeguardRoutes,
  // ...helpRoutes
]

import request from '@/utils/http'

/**
 * 仪表盘统计数据 API
 */

/**
 * 获取统计数据概览
 */
export function fetchDashboardStats() {
  return request
    .get<{
      userCount: number
      departmentCount: number
      policyCount: number
      activePolicyCount: number
    }>({
      url: '/api/dashboard/stats'
    })
    .catch(() => {
      // 如果后端没有这个接口，返回模拟数据
      return {
        userCount: 0,
        departmentCount: 0,
        policyCount: 0,
        activePolicyCount: 0
      }
    })
}

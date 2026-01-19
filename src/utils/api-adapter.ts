/**
 * API 适配器工具
 * 用于转换后端数据格式到前端期望的格式
 */

/**
 * 后端分页格式：PageResult { count, pageNo, pageSize, lists }
 * 前端期望格式：PaginatedResponse { records, current, size, total }
 */
export function adaptPageResult<T>(backendData: {
  count: number
  pageNo: number
  pageSize: number
  lists: T[]
}): {
  records: T[]
  current: number
  size: number
  total: number
} {
  return {
    records: backendData.lists || [],
    current: backendData.pageNo || 1,
    size: backendData.pageSize || 20,
    total: backendData.count || 0
  }
}

/**
 * 后端用户字段：{ id, name, phone, deptId, deptName, role, status }
 * 前端期望字段：{ id, userName, userPhone, userEmail, userGender, avatar, status, createTime }
 */
export function adaptUserItem(backendUser: {
  id: number
  name: string
  phone: string
  email?: string
  deptId: number
  deptName?: string
  role?: string
  status: number
}): {
  id: number
  userName: string
  userPhone: string
  userEmail: string
  userGender: string
  avatar: string
  status: string
  nickName: string
  userRoles: string[]
  createTime: string
  updateTime: string
} {
  return {
    id: backendUser.id,
    userName: backendUser.name || '',
    userPhone: backendUser.phone || '',
    userEmail: backendUser.email || '',
    userGender: '未知',
    avatar: '',
    status: String(backendUser.status || 1),
    nickName: backendUser.name || '',
    userRoles: backendUser.role ? [backendUser.role] : [],
    createTime: '',
    updateTime: ''
  }
}

/**
 * 后端部门字段：{ id, name, parentId }
 * 前端期望字段：{ id, name, parentId }
 */
export function adaptDeptItem(backendDept: { id: number; name: string; parentId?: number }): {
  id: number
  name: string
  parentId?: number
} {
  return {
    id: backendDept.id,
    name: backendDept.name,
    parentId: backendDept.parentId
  }
}

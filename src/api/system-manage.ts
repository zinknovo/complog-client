import request from '@/utils/http'
import { AppRouteRecord } from '@/types/router'
import { adaptPageResult, adaptUserItem, adaptDeptItem } from '@/utils/api-adapter'

/**
 * 后端接口路径映射：
 * - 用户列表：GET /users (后端) vs /api/user/list (前端期望)
 * - 部门列表：GET /departments (后端) vs /api/dept/list (前端期望)
 * - 登录：POST /api/auth/login ✅ (已匹配)
 */

/**
 * 获取用户列表
 * 后端接口：GET /users?pageNum=1&pageSize=20&name=xxx&deptId=xxx
 * 后端返回：AjaxResult<PageResult<UserListVo>>
 * 前端期望：PaginatedResponse<UserListItem>
 */
export function fetchGetUserList(params: Api.SystemManage.UserSearchParams) {
  // 转换前端参数格式到后端格式
  const backendParams: any = {
    pageNum: params.current || 1,
    pageSize: params.size || 20
  }

  if (params.userName) {
    backendParams.name = params.userName
  }

  if (params.id) {
    backendParams.deptId = params.id
  }

  return request
    .get<{
      count: number
      pageNo: number
      pageSize: number
      lists: Array<{
        id: number
        name: string
        phone: string
        email?: string
        deptId: number
        deptName?: string
        role?: string
        status: number
      }>
    }>({
      url: '/users',
      params: backendParams
    })
    .then((data) => {
      // 转换分页格式和字段格式
      const adaptedPage = adaptPageResult(data)
      return {
        ...adaptedPage,
        records: data.lists.map(adaptUserItem)
      }
    })
}

/**
 * 获取部门列表
 * 后端接口：GET /departments?pageNum=1&pageSize=20&name=xxx
 * 后端返回：AjaxResult<PageResult<DeptListVo>>
 */
export function fetchGetDeptList(params?: { current?: number; size?: number; name?: string }) {
  const backendParams: any = {
    pageNum: params?.current || 1,
    pageSize: params?.size || 20
  }

  if (params?.name) {
    backendParams.name = params.name
  }

  return request
    .get<{
      count: number
      pageNo: number
      pageSize: number
      lists: Array<{
        id: number
        name: string
        parentId?: number
      }>
    }>({
      url: '/departments',
      params: backendParams
    })
    .then((data) => {
      // 转换分页格式
      const adaptedPage = adaptPageResult(data)
      return {
        ...adaptedPage,
        records: data.lists.map(adaptDeptItem)
      }
    })
}

/**
 * 添加用户
 * 后端接口：POST /users
 * 后端参数：UserAddVo { name, phone, email?, deptId, role?, status? }
 */
export function fetchAddUser(data: Api.SystemManage.UserAddParams) {
  return request.post<boolean>({
    url: '/users',
    params: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      deptId: data.deptId,
      role: data.role,
      status: data.status || 1
    }
  })
}

/**
 * 添加部门
 * 后端接口：POST /departments
 * 后端参数：DeptAddVo { name, parentId? }
 */
export function fetchAddDept(data: Api.SystemManage.DeptAddParams) {
  return request.post<boolean>({
    url: '/departments',
    params: {
      name: data.name,
      parentId: data.parentId
    }
  })
}

// 获取角色列表（暂时保留，后端可能没有）
export function fetchGetRoleList(params: Api.SystemManage.RoleSearchParams) {
  return request.get<Api.SystemManage.RoleList>({
    url: '/api/role/list',
    params
  })
}

// 获取菜单列表（暂时保留）
export function fetchGetMenuList() {
  return request.get<AppRouteRecord[]>({
    url: '/api/v3/system/menus'
  })
}

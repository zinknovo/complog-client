import request from '@/utils/http'
import { useUserStore } from '@/store/modules/user'

/**
 * 登录
 * 后端接口：POST /api/auth/login
 * 后端期望参数：{ phone, password }
 * 前端发送参数：{ userName, password }
 * 后端返回：ApiResponse<LoginResponse> { code: 200, message: "success", data: { token, user } }
 * 前端期望：{ token, refreshToken }
 */
export function fetchLogin(params: Api.Auth.LoginParams) {
  // 转换前端参数格式到后端格式
  // 前端：{ userName, password }
  // 后端：{ phone, password }
  const backendParams = {
    phone: params.userName, // 前端用 userName 作为手机号
    password: params.password
  }

  return request
    .post<{
      token: string
      user: {
        id: number
        name: string
        phone: string
        email?: string
        deptId: number
        role?: string
        status: number
      }
    }>({
      url: '/api/auth/login',
      params: backendParams
    })
    .then((data) => {
      // 转换后端格式到前端期望格式
      return {
        token: data.token,
        refreshToken: data.token, // 后端没有 refreshToken，暂时用 token
        user: data.user
      }
    })
}

/**
 * 获取用户信息
 * 后端接口：GET /api/user/info（需要后端实现）
 * 或者从登录响应的 user 字段获取
 */
export function fetchGetUserInfo() {
  const userStore = useUserStore()
  const cached = userStore.getUserInfo
  if (cached && cached.userId) {
    return Promise.resolve(cached as Api.Auth.UserInfo)
  }
  // 如果接口不存在，返回默认值（实际应该从登录响应中获取）
  return Promise.resolve({
    userId: 0,
    userName: '',
    email: '',
    roles: [],
    buttons: []
  })
}

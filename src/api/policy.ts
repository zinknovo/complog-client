import request from '@/utils/http'
import { adaptPageResult } from '@/utils/api-adapter'

/**
 * 制度管理 API
 */

/**
 * 获取制度列表
 * 后端接口：GET /policies?pageNum=1&pageSize=20&name=xxx&type=xxx&status=xxx
 * 后端返回：AjaxResult<PageResult<PolicyListVo>>
 */
export function fetchGetPolicyList(params: Api.Policy.PolicySearchParams) {
  const backendParams: any = {
    pageNum: params.current || 1,
    pageSize: params.size || 20
  }

  if (params.name) {
    backendParams.name = params.name
  }

  if (params.type !== undefined) {
    backendParams.type = params.type
  }

  if (params.status !== undefined) {
    backendParams.status = params.status
  }

  return request
    .get<{
      count: number
      pageNo: number
      pageSize: number
      lists: Api.Policy.PolicyListItem[]
    }>({
      url: '/policies',
      params: backendParams
    })
    .then((data) => {
      // 转换分页格式
      const adaptedPage = adaptPageResult(data)
      return {
        ...adaptedPage,
        records: data.lists
      }
    })
}

/**
 * 获取制度详情
 * 后端接口：GET /policies/{id}
 */
export function fetchGetPolicyDetail(id: number) {
  return request.get<Api.Policy.PolicyDetail>({
    url: `/policies/${id}`
  })
}

/**
 * 添加制度
 * 后端接口：POST /policies
 */
export function fetchAddPolicy(data: Api.Policy.PolicyAddParams) {
  return request.post<boolean>({
    url: '/policies',
    params: data
  })
}

/**
 * 编辑制度
 * 后端接口：PUT /policies/{id}
 */
export function fetchEditPolicy(id: number, data: Api.Policy.PolicyEditParams) {
  return request.put<boolean>({
    url: `/policies/${id}`,
    params: data
  })
}

/**
 * 删除制度
 * 后端接口：DELETE /policies/{id}
 */
export function fetchDeletePolicy(id: number) {
  return request.del<boolean>({
    url: `/policies/${id}`
  })
}

/**
 * 获取制度版本历史
 * 后端接口：GET /policies/{policyId}/versions
 */
export function fetchGetPolicyVersions(policyId: number) {
  return request.get<Api.Policy.PolicyVersionHistory[]>({
    url: `/policies/${policyId}/versions`
  })
}

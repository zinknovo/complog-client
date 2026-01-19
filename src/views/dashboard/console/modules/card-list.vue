<template>
  <ElRow :gutter="20" class="flex">
    <ElCol v-for="(item, index) in dataList" :key="index" :sm="12" :md="6" :lg="6">
      <div class="art-card relative flex flex-col justify-center h-35 px-5 mb-5 max-sm:mb-4">
        <span class="text-g-700 text-sm">{{ item.des }}</span>
        <ArtCountTo class="text-[26px] font-medium mt-2" :target="item.num" :duration="1300" />
        <div class="flex-c mt-1">
          <span class="text-xs text-g-600">较上周</span>
          <span
            class="ml-1 text-xs font-semibold"
            :class="[item.change.indexOf('+') === -1 ? 'text-danger' : 'text-success']"
          >
            {{ item.change }}
          </span>
        </div>
        <div
          class="absolute top-0 bottom-0 right-5 m-auto size-12.5 rounded-xl flex-cc bg-theme/10"
        >
          <ArtSvgIcon :icon="item.icon" class="text-xl text-theme" />
        </div>
      </div>
    </ElCol>
  </ElRow>
</template>

<script setup lang="ts">
  import { fetchGetUserList } from '@/api/system-manage'
  import { fetchGetDeptList } from '@/api/system-manage'
  import { fetchGetPolicyList } from '@/api/policy'

  interface CardDataItem {
    des: string
    icon: string
    startVal: number
    duration: number
    num: number
    change: string
  }

  /**
   * 卡片统计数据列表
   * 展示用户总数、部门总数、制度总数、生效制度数等核心数据指标
   */
  const dataList = reactive<CardDataItem[]>([
    {
      des: '用户总数',
      icon: 'ri:user-line',
      startVal: 0,
      duration: 1000,
      num: 0,
      change: '-'
    },
    {
      des: '部门总数',
      icon: 'ri:team-line',
      startVal: 0,
      duration: 1000,
      num: 0,
      change: '-'
    },
    {
      des: '制度总数',
      icon: 'ri:file-text-line',
      startVal: 0,
      duration: 1000,
      num: 0,
      change: '-'
    },
    {
      des: '生效制度',
      icon: 'ri:check-line',
      startVal: 0,
      duration: 1000,
      num: 0,
      change: '-'
    }
  ])

  // 加载统计数据
  onMounted(async () => {
    try {
      // 获取用户总数
      try {
        const userRes = await fetchGetUserList({ current: 1, size: 1 })
        dataList[0].num = userRes.total || 0
      } catch (error) {
        console.error('加载用户统计失败:', error)
        // 如果服务未启动，保持默认值（0）
      }

      // 获取部门总数
      try {
        const deptRes = await fetchGetDeptList({ current: 1, size: 1 })
        dataList[1].num = deptRes.total || 0
      } catch (error) {
        console.error('加载部门统计失败:', error)
        // 如果服务未启动，保持默认值（0）
      }

      // 获取制度总数
      try {
        const policyRes = await fetchGetPolicyList({ current: 1, size: 1 })
        dataList[2].num = policyRes.total || 0
      } catch (error) {
        console.error('加载制度统计失败:', error)
        // 如果服务未启动，保持默认值（0）
      }

      // 获取生效制度数（status = 1）
      try {
        const activePolicyRes = await fetchGetPolicyList({ current: 1, size: 1, status: 1 })
        dataList[3].num = activePolicyRes.total || 0
      } catch (error) {
        console.error('加载生效制度统计失败:', error)
        // 如果服务未启动，保持默认值（0）
      }
    } catch (error) {
      console.error('加载统计数据失败:', error)
    }
  })
</script>

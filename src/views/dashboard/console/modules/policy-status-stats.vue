<template>
  <div class="art-card p-5 h-128 overflow-hidden mb-5 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4>制度状态统计</h4>
        <p>按状态分类的制度数量</p>
      </div>
    </div>
    <div v-loading="loading" class="flex flex-col gap-4 mt-4">
      <div
        v-for="(item, index) in statusData"
        :key="index"
        class="flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: item.color }"></div>
          <span class="text-sm">{{ item.label }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-lg font-semibold">{{ item.count }}</span>
          <span class="text-xs text-gray-500">个</span>
        </div>
      </div>
      <ElProgress
        :percentage="total > 0 ? Math.round((statusData[1].count / total) * 100) : 0"
        :color="statusData[1].color"
        :stroke-width="8"
        :show-text="false"
        class="mt-2"
      />
      <div class="text-xs text-gray-500 text-center">
        生效制度占比：{{ total > 0 ? Math.round((statusData[1].count / total) * 100) : 0 }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { fetchGetPolicyList } from '@/api/policy'

  const loading = ref(false)
  const statusData = ref([
    { label: '草稿', count: 0, color: '#909399' },
    { label: '生效中', count: 0, color: '#67c23a' },
    { label: '已失效', count: 0, color: '#f56c6c' }
  ])
  const total = computed(() => statusData.value.reduce((sum, item) => sum + item.count, 0))

  onMounted(async () => {
    loading.value = true
    try {
      // 获取草稿状态
      const draftRes = await fetchGetPolicyList({ current: 1, size: 1, status: 0 })
      statusData.value[0].count = draftRes.total || 0

      // 获取生效中状态
      const activeRes = await fetchGetPolicyList({ current: 1, size: 1, status: 1 })
      statusData.value[1].count = activeRes.total || 0

      // 获取已失效状态
      const expiredRes = await fetchGetPolicyList({ current: 1, size: 1, status: 2 })
      statusData.value[2].count = expiredRes.total || 0
    } catch (error) {
      console.error('加载制度状态统计失败:', error)
      // 如果服务未启动，保持默认值（0）
      statusData.value = [
        { label: '草稿', count: 0, color: '#909399' },
        { label: '生效中', count: 0, color: '#67c23a' },
        { label: '已失效', count: 0, color: '#f56c6c' }
      ]
    } finally {
      loading.value = false
    }
  })
</script>

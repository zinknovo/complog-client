<template>
  <div class="art-card h-128 p-5 mb-5 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4>待办事项</h4>
        <p
          >待审核的制度<span class="text-danger">{{ pendingCount }}</span></p
        >
      </div>
    </div>

    <div class="h-[calc(100%-40px)] overflow-auto">
      <ElScrollbar>
        <div
          class="flex-cb h-17.5 border-b border-g-300 text-sm last:border-b-0"
          v-for="(item, index) in list"
          :key="index"
        >
          <div>
            <p class="text-sm">{{ item.title }}</p>
            <p class="text-g-500 mt-1">{{ item.date }}</p>
          </div>
          <ElCheckbox v-model="item.complate" />
        </div>
        <div
          v-if="list.length === 0"
          class="flex items-center justify-center h-full text-gray-400 text-sm"
        >
          暂无待办事项
        </div>
      </ElScrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { fetchGetPolicyList } from '@/api/policy'

  interface TodoItem {
    title: string
    date: string
    complate: boolean
  }

  const list = ref<TodoItem[]>([])
  const pendingCount = computed(() => list.value.filter((item) => !item.complate).length)

  /**
   * 待办事项列表
   * 记录待审核的制度
   */
  onMounted(async () => {
    try {
      // 获取草稿状态的制度（待审核）
      const res = await fetchGetPolicyList({ current: 1, size: 10, status: 0 })
      if (res.records && res.records.length > 0) {
        list.value = res.records.slice(0, 5).map((policy) => ({
          title: policy.name,
          date: policy.createdAt || '',
          complate: false
        }))
      }
    } catch (error) {
      console.error('加载待办事项失败:', error)
    }
  })
</script>

<template>
  <div class="art-card p-5 h-128 overflow-hidden mb-5 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4>最新制度</h4>
        <p>最近创建的制度</p>
      </div>
    </div>
    <ArtTable
      v-loading="loading"
      class="w-full"
      :data="tableData"
      style="width: 100%"
      size="large"
      :border="false"
      :stripe="false"
      :header-cell-style="{ background: 'transparent' }"
      table-layout="auto"
    >
      <template #default>
        <ElTableColumn label="制度名称" prop="name" min-width="200">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row.name }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="制度编号" prop="code" width="150" />
        <ElTableColumn label="类型" prop="type" width="120">
          <template #default="scope">
            <ElTag v-if="scope.row.type === 1" type="primary">公司章程</ElTag>
            <ElTag v-else-if="scope.row.type === 2" type="success">三会议事规则</ElTag>
            <ElTag v-else-if="scope.row.type === 3" type="warning">内部规章制度</ElTag>
            <ElTag v-else-if="scope.row.type === 4" type="info">业务规则指引</ElTag>
            <ElTag v-else type="info">未知</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="状态" prop="status" width="100">
          <template #default="scope">
            <ElTag v-if="scope.row.status === 0" type="info">草稿</ElTag>
            <ElTag v-else-if="scope.row.status === 1" type="success">生效中</ElTag>
            <ElTag v-else-if="scope.row.status === 2" type="danger">已失效</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="创建时间" prop="createdAt" width="160" />
      </template>
    </ArtTable>
  </div>
</template>

<script setup lang="ts">
  import { fetchGetPolicyList } from '@/api/policy'

  const loading = ref(false)
  const tableData = ref<Api.Policy.PolicyListItem[]>([])

  onMounted(async () => {
    loading.value = true
    try {
      const res = await fetchGetPolicyList({ current: 1, size: 10 })
      tableData.value = res.records.slice(0, 10) || []
    } catch (error) {
      console.error('加载最新制度失败:', error)
      // 如果服务未启动，显示空列表而不是报错
      tableData.value = []
    } finally {
      loading.value = false
    }
  })
</script>

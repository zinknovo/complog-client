<!-- 工作台页面 - 制度管理系统 -->
<template>
  <div>
    <!-- 统计卡片 -->
    <CardList></CardList>

    <ElRow :gutter="20">
      <ElCol :sm="24" :md="12" :lg="12">
        <!-- 最新制度列表 -->
        <LatestPolicies />
      </ElCol>
      <ElCol :sm="24" :md="12" :lg="12">
        <!-- 制度状态统计 -->
        <PolicyStatusStats />
      </ElCol>
    </ElRow>

    <ElRow :gutter="20">
      <ElCol :sm="24" :md="24" :lg="12">
        <!-- 制度类型分布 -->
        <PolicyTypeDistribution />
      </ElCol>
      <ElCol :sm="24" :md="12" :lg="6">
        <!-- 动态统计 -->
        <SystemStats />
      </ElCol>
      <ElCol :sm="24" :md="12" :lg="6">
        <!-- 待办事项 -->
        <TodoList />
      </ElCol>
    </ElRow>
  </div>
</template>

<script setup lang="ts">
  import CardList from './modules/card-list.vue'
  import LatestPolicies from './modules/latest-policies.vue'
  import PolicyStatusStats from './modules/policy-status-stats.vue'
  import PolicyTypeDistribution from './modules/policy-type-distribution.vue'
  import SystemStats from './modules/system-stats.vue'
  import TodoList from './modules/todo-list.vue'
  defineOptions({ name: 'Console' })
</script>

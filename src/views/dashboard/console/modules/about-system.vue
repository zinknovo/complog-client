<template>
  <div class="art-card p-5 mb-5 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4>关于系统</h4>
        <p>CompLog - 制度管理系统</p>
      </div>
    </div>
    <div class="mt-4">
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">系统名称</span>
          <span class="text-sm font-semibold">CompLog 制度管理系统</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">系统版本</span>
          <span class="text-sm font-semibold">v1.0.0</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">架构模式</span>
          <span class="text-sm font-semibold">微服务架构</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">后端服务</span>
          <span class="text-sm font-semibold">auth-service, base-service, policy-service</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">前端框架</span>
          <span class="text-sm font-semibold">Vue3 + TypeScript + Vite</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">数据库</span>
          <span class="text-sm font-semibold">MySQL</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">缓存</span>
          <span class="text-sm font-semibold">Redis</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">消息队列</span>
          <span class="text-sm font-semibold">Kafka</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineOptions({ name: 'AboutSystem' })
</script>

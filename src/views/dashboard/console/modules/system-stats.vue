<template>
  <div class="art-card p-5 h-128 overflow-hidden mb-5 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4>系统统计</h4>
        <p>系统运行状态</p>
      </div>
    </div>
    <div v-loading="loading" class="flex flex-col gap-4 mt-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <ArtSvgIcon icon="ri:server-line" class="text-xl text-primary" />
          <span class="text-sm">系统状态</span>
        </div>
        <ElTag type="success">运行中</ElTag>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <ArtSvgIcon icon="ri:database-line" class="text-xl text-success" />
          <span class="text-sm">数据库</span>
        </div>
        <ElTag type="success">正常</ElTag>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <ArtSvgIcon icon="ri:time-line" class="text-xl text-warning" />
          <span class="text-sm">运行时长</span>
        </div>
        <span class="text-sm">{{ uptime }}</span>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <ArtSvgIcon icon="ri:user-line" class="text-xl text-info" />
          <span class="text-sm">在线用户</span>
        </div>
        <span class="text-sm">{{ onlineUsers }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const loading = ref(false)
  const uptime = ref('0 天')
  const onlineUsers = ref(0)

  onMounted(() => {
    // 模拟运行时长（实际应该从后端获取）
    const startTime = Date.now()
    setInterval(() => {
      const days = Math.floor((Date.now() - startTime) / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        ((Date.now() - startTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      uptime.value = `${days} 天 ${hours} 小时`
    }, 1000)

    // 模拟在线用户数（实际应该从后端获取）
    onlineUsers.value = Math.floor(Math.random() * 10) + 1
  })
</script>

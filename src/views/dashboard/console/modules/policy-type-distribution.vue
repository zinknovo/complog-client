<template>
  <div class="art-card p-5 h-128 overflow-hidden mb-5 max-sm:mb-4">
    <div class="art-card-header">
      <div class="title">
        <h4>制度类型分布</h4>
        <p>按类型分类的制度数量</p>
      </div>
    </div>
    <div v-loading="loading" class="mt-4">
      <div id="policy-type-chart" style="width: 100%; height: 250px"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts'
  import { fetchGetPolicyList } from '@/api/policy'

  const loading = ref(false)
  const chart = ref<echarts.ECharts | null>(null)

  const typeData = ref([
    { name: '公司章程', value: 0, color: '#409eff' },
    { name: '三会议事规则', value: 0, color: '#67c23a' },
    { name: '内部规章制度', value: 0, color: '#e6a23c' },
    { name: '业务规则指引', value: 0, color: '#909399' }
  ])

  onMounted(async () => {
    loading.value = true
    try {
      // 获取各类型的制度数量
      for (let i = 1; i <= 4; i++) {
        const res = await fetchGetPolicyList({ current: 1, size: 1, type: i })
        typeData.value[i - 1].value = res.total || 0
      }

      // 初始化图表
      const chartDom = document.getElementById('policy-type-chart')
      if (chartDom) {
        chart.value = echarts.init(chartDom)
        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: typeData.value.map((item) => item.name)
          },
          series: [
            {
              name: '制度类型',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                formatter: '{b}: {c}'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 14,
                  fontWeight: 'bold'
                }
              },
              data: typeData.value
            }
          ]
        }
        chart.value.setOption(option)
      }
    } catch (error) {
      console.error('加载制度类型分布失败:', error)
      // 如果服务未启动，保持默认值（0）
      typeData.value = [
        { name: '公司章程', value: 0, color: '#409eff' },
        { name: '三会议事规则', value: 0, color: '#67c23a' },
        { name: '内部规章制度', value: 0, color: '#e6a23c' },
        { name: '业务规则指引', value: 0, color: '#909399' }
      ]
    } finally {
      loading.value = false
    }
  })

  onUnmounted(() => {
    if (chart.value) {
      chart.value.dispose()
    }
  })
</script>

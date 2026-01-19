<!-- 制度管理页面 -->
<template>
  <div class="policy-page art-full-height">
    <!-- 搜索栏 -->
    <PolicySearch
      v-model="searchForm"
      @search="handleSearch"
      @reset="resetSearchParams"
    ></PolicySearch>

    <ElCard class="art-table-card" shadow="never">
      <!-- 表格头部 -->
      <ArtTableHeader v-model:columns="columnChecks" :loading="loading" @refresh="refreshData">
        <template #left>
          <ElSpace wrap>
            <ElButton @click="showDialog('add')" v-ripple>新增制度</ElButton>
          </ElSpace>
        </template>
      </ArtTableHeader>

      <!-- 表格 -->
      <ArtTable
        :loading="loading"
        :data="data"
        :columns="columns"
        :pagination="pagination"
        @selection-change="handleSelectionChange"
        @pagination:size-change="handleSizeChange"
        @pagination:current-change="handleCurrentChange"
      >
      </ArtTable>

      <!-- 制度弹窗 -->
      <PolicyDialog
        v-model:visible="dialogVisible"
        :type="dialogType"
        :policy-data="currentPolicyData"
        @submit="handleDialogSubmit"
      />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/hooks/core/useTable'
  import { fetchGetPolicyList, fetchDeletePolicy } from '@/api/policy'
  import PolicySearch from './modules/policy-search.vue'
  import PolicyDialog from './modules/policy-dialog.vue'
  import { ElMessageBox, ElTag, ElMessage } from 'element-plus'
  import { DialogType } from '@/types'
  import ArtButtonTable from '@/components/core/forms/art-button-table/index.vue'

  defineOptions({ name: 'PolicyList' })

  type PolicyListItem = Api.Policy.PolicyListItem

  // 弹窗相关
  const dialogType = ref<DialogType>('add')
  const dialogVisible = ref(false)
  const currentPolicyData = ref<Partial<PolicyListItem>>({})

  // 选中行
  const selectedRows = ref<PolicyListItem[]>([])

  // 搜索表单
  const searchForm = ref({
    name: undefined,
    type: undefined,
    status: undefined
  })

  // 制度类型配置
  const POLICY_TYPE_CONFIG = {
    1: { type: 'primary' as const, text: '公司章程' },
    2: { type: 'success' as const, text: '三会议事规则' },
    3: { type: 'warning' as const, text: '内部规章制度' },
    4: { type: 'info' as const, text: '业务规则指引' }
  } as const

  // 制度状态配置
  const POLICY_STATUS_CONFIG = {
    0: { type: 'info' as const, text: '草稿' },
    1: { type: 'success' as const, text: '生效中' },
    2: { type: 'danger' as const, text: '已失效' }
  } as const

  /**
   * 获取制度类型配置
   */
  const getPolicyTypeConfig = (type: number) => {
    return (
      POLICY_TYPE_CONFIG[type as keyof typeof POLICY_TYPE_CONFIG] || {
        type: 'info' as const,
        text: '未知'
      }
    )
  }

  /**
   * 获取制度状态配置
   */
  const getPolicyStatusConfig = (status: number) => {
    return (
      POLICY_STATUS_CONFIG[status as keyof typeof POLICY_STATUS_CONFIG] || {
        type: 'info' as const,
        text: '未知'
      }
    )
  }

  const {
    columns,
    columnChecks,
    data,
    loading,
    pagination,
    getData,
    searchParams,
    resetSearchParams,
    handleSizeChange,
    handleCurrentChange,
    refreshData
  } = useTable({
    // 核心配置
    core: {
      apiFn: fetchGetPolicyList,
      apiParams: {
        current: 1,
        size: 20,
        ...searchForm.value
      },
      columnsFactory: () => [
        { type: 'selection' }, // 勾选列
        { type: 'index', width: 60, label: '序号' }, // 序号
        {
          prop: 'name',
          label: '制度名称',
          width: 200,
          showOverflowTooltip: true
        },
        {
          prop: 'code',
          label: '制度编号',
          width: 150
        },
        {
          prop: 'type',
          label: '类型',
          width: 120,
          formatter: (row) => {
            const typeConfig = getPolicyTypeConfig(row.type)
            return h(ElTag, { type: typeConfig.type }, () => typeConfig.text)
          }
        },
        {
          prop: 'currentVersion',
          label: '当前版本',
          width: 100
        },
        {
          prop: 'status',
          label: '状态',
          width: 100,
          formatter: (row) => {
            const statusConfig = getPolicyStatusConfig(row.status)
            return h(ElTag, { type: statusConfig.type }, () => statusConfig.text)
          }
        },
        {
          prop: 'ownerDeptName',
          label: '负责部门',
          width: 150,
          showOverflowTooltip: true
        },
        {
          prop: 'effectiveDate',
          label: '生效日期',
          width: 120,
          sortable: true
        },
        {
          prop: 'creator',
          label: '创建人',
          width: 100
        },
        {
          prop: 'createdAt',
          label: '创建时间',
          width: 160,
          sortable: true
        },
        {
          prop: 'operation',
          label: '操作',
          width: 150,
          fixed: 'right',
          formatter: (row) =>
            h('div', [
              h(ArtButtonTable, {
                type: 'edit',
                onClick: () => showDialog('edit', row)
              }),
              h(ArtButtonTable, {
                type: 'delete',
                onClick: () => deletePolicy(row)
              })
            ])
        }
      ]
    }
  })

  /**
   * 搜索处理
   */
  const handleSearch = (params: Record<string, any>) => {
    console.log(params)
    Object.assign(searchParams, params)
    getData()
  }

  /**
   * 显示制度弹窗
   */
  const showDialog = (type: DialogType, row?: PolicyListItem): void => {
    console.log('打开弹窗:', { type, row })
    dialogType.value = type
    currentPolicyData.value = row || {}
    nextTick(() => {
      dialogVisible.value = true
    })
  }

  /**
   * 删除制度
   */
  const deletePolicy = (row: PolicyListItem): void => {
    console.log('删除制度:', row)
    ElMessageBox.confirm(`确定要删除制度"${row.name}"吗？`, '删除制度', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    })
      .then(async () => {
        try {
          await fetchDeletePolicy(row.id)
          ElMessage.success('删除成功')
          refreshData()
        } catch (err) {
          console.error('删除失败:', err)
          ElMessage.error('删除失败')
        }
      })
      .catch(() => {
        // 取消删除
      })
  }

  /**
   * 处理弹窗提交事件
   */
  const handleDialogSubmit = async () => {
    try {
      dialogVisible.value = false
      currentPolicyData.value = {}
      refreshData()
    } catch (error) {
      console.error('提交失败:', error)
    }
  }

  /**
   * 处理表格行选择变化
   */
  const handleSelectionChange = (selection: PolicyListItem[]): void => {
    selectedRows.value = selection
    console.log('选中行数据:', selectedRows.value)
  }
</script>

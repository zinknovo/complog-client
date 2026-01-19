<!-- 部门管理页面 -->
<template>
  <div class="department-page art-full-height">
    <!-- 搜索栏 -->
    <DepartmentSearch
      v-model="searchForm"
      @search="handleSearch"
      @reset="resetSearchParams"
    ></DepartmentSearch>

    <ElCard class="art-table-card" shadow="never">
      <!-- 表格头部 -->
      <ArtTableHeader v-model:columns="columnChecks" :loading="loading" @refresh="refreshData">
        <template #left>
          <ElSpace wrap>
            <ElButton @click="showDialog('add')" v-ripple>新增部门</ElButton>
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

      <!-- 部门弹窗 -->
      <DepartmentDialog
        v-model:visible="dialogVisible"
        :type="dialogType"
        :department-data="currentDepartmentData"
        @submit="handleDialogSubmit"
      />
    </ElCard>
  </div>
</template>

<script setup lang="ts">
  import { useTable } from '@/hooks/core/useTable'
  import { fetchGetDeptList } from '@/api/system-manage'
  import DepartmentSearch from './modules/department-search.vue'
  import DepartmentDialog from './modules/department-dialog.vue'
  import { ElMessageBox } from 'element-plus'
  import { DialogType } from '@/types'
  import ArtButtonTable from '@/components/core/forms/art-button-table/index.vue'

  defineOptions({ name: 'Department' })

  type DeptListItem = Api.SystemManage.DeptListItem

  // 弹窗相关
  const dialogType = ref<DialogType>('add')
  const dialogVisible = ref(false)
  const currentDepartmentData = ref<Partial<DeptListItem>>({})

  // 选中行
  const selectedRows = ref<DeptListItem[]>([])

  // 搜索表单
  const searchForm = ref({
    name: undefined
  })

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
      apiFn: fetchGetDeptList,
      apiParams: {
        current: 1,
        size: 20,
        ...searchForm.value
      },
      columnsFactory: () => [
        { type: 'selection' }, // 勾选列
        { type: 'index', width: 60, label: '序号' }, // 序号
        {
          prop: 'id',
          label: 'ID',
          width: 100
        },
        {
          prop: 'name',
          label: '部门名称',
          width: 200
        },
        {
          prop: 'parentId',
          label: '父部门ID',
          width: 120
        },
        {
          prop: 'operation',
          label: '操作',
          width: 120,
          fixed: 'right', // 固定列
          formatter: (row) =>
            h('div', [
              h(ArtButtonTable, {
                type: 'edit',
                onClick: () => showDialog('edit', row)
              }),
              h(ArtButtonTable, {
                type: 'delete',
                onClick: () => deleteDepartment(row)
              })
            ])
        }
      ]
    }
  })

  /**
   * 搜索处理
   * @param params 参数
   */
  const handleSearch = (params: Record<string, any>) => {
    console.log(params)
    // 搜索参数赋值
    Object.assign(searchParams, params)
    getData()
  }

  /**
   * 显示部门弹窗
   */
  const showDialog = (type: DialogType, row?: DeptListItem): void => {
    console.log('打开弹窗:', { type, row })
    dialogType.value = type
    currentDepartmentData.value = row || {}
    nextTick(() => {
      dialogVisible.value = true
    })
  }

  /**
   * 删除部门
   */
  const deleteDepartment = (row: DeptListItem): void => {
    console.log('删除部门:', row)
    ElMessageBox.confirm(`确定要删除部门"${row.name}"吗？`, '删除部门', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    })
      .then(() => {
        ElMessage.success('删除成功')
        refreshData()
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
      currentDepartmentData.value = {}
      refreshData()
    } catch (error) {
      console.error('提交失败:', error)
    }
  }

  /**
   * 处理表格行选择变化
   */
  const handleSelectionChange = (selection: DeptListItem[]): void => {
    selectedRows.value = selection
    console.log('选中行数据:', selectedRows.value)
  }
</script>

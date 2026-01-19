<template>
  <ArtSearchBar
    ref="searchBarRef"
    v-model="formData"
    :items="formItems"
    :rules="rules"
    @reset="handleReset"
    @search="handleSearch"
  >
  </ArtSearchBar>
</template>

<script setup lang="ts">
  interface Props {
    modelValue: Record<string, any>
  }
  interface Emits {
    (e: 'update:modelValue', value: Record<string, any>): void
    (e: 'search', params: Record<string, any>): void
    (e: 'reset'): void
  }
  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  // 表单数据双向绑定
  const searchBarRef = ref()
  const formData = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
  })

  // 校验规则
  const rules = {}

  // 制度类型选项
  const typeOptions = [
    { label: '公司章程', value: 1 },
    { label: '三会议事规则', value: 2 },
    { label: '内部规章制度', value: 3 },
    { label: '业务规则指引', value: 4 }
  ]

  // 制度状态选项
  const statusOptions = [
    { label: '草稿', value: 0 },
    { label: '生效中', value: 1 },
    { label: '已失效', value: 2 }
  ]

  // 表单配置
  const formItems = computed(() => [
    {
      label: '制度名称',
      key: 'name',
      type: 'input',
      placeholder: '请输入制度名称',
      clearable: true
    },
    {
      label: '制度类型',
      key: 'type',
      type: 'select',
      props: {
        placeholder: '请选择制度类型',
        options: typeOptions,
        clearable: true
      }
    },
    {
      label: '状态',
      key: 'status',
      type: 'select',
      props: {
        placeholder: '请选择状态',
        options: statusOptions,
        clearable: true
      }
    }
  ])

  // 事件
  function handleReset() {
    console.log('重置表单')
    emit('reset')
  }

  async function handleSearch() {
    await searchBarRef.value.validate()
    emit('search', formData.value)
    console.log('表单数据', formData.value)
  }
</script>

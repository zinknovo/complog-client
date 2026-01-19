<template>
  <ElDialog
    v-model="dialogVisible"
    :title="dialogType === 'add' ? '添加部门' : '编辑部门'"
    width="30%"
    align-center
  >
    <ElForm ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <ElFormItem label="部门名称" prop="name">
        <ElInput v-model="formData.name" placeholder="请输入部门名称" />
      </ElFormItem>
      <ElFormItem label="父部门ID" prop="parentId">
        <ElInputNumber
          v-model="formData.parentId"
          :min="0"
          placeholder="请输入父部门ID（可选）"
          style="width: 100%"
        />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="handleSubmit">提交</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
  import type { FormInstance, FormRules } from 'element-plus'
  import { fetchAddDept } from '@/api/system-manage'

  interface Props {
    visible: boolean
    type: string
    departmentData?: Partial<Api.SystemManage.DeptListItem>
  }

  interface Emits {
    (e: 'update:visible', value: boolean): void
    (e: 'submit'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  // 对话框显示控制
  const dialogVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
  })

  const dialogType = computed(() => props.type)

  // 表单实例
  const formRef = ref<FormInstance>()

  // 表单数据
  const formData = reactive({
    name: '',
    parentId: undefined as number | undefined
  })

  // 表单验证规则
  const rules: FormRules = {
    name: [
      { required: true, message: '请输入部门名称', trigger: 'blur' },
      { min: 1, max: 50, message: '部门名称长度在 1 到 50 个字符', trigger: 'blur' }
    ]
  }

  // 监听数据变化，填充表单
  watch(
    () => props.departmentData,
    (newData) => {
      if (newData) {
        formData.name = newData.name || ''
        formData.parentId = newData.parentId
      } else {
        formData.name = ''
        formData.parentId = undefined
      }
    },
    { immediate: true }
  )

  // 监听对话框显示状态，重置表单
  watch(dialogVisible, (visible) => {
    if (!visible) {
      formRef.value?.resetFields()
    } else if (props.departmentData) {
      formData.name = props.departmentData.name || ''
      formData.parentId = props.departmentData.parentId
    }
  })

  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return

    try {
      await formRef.value.validate()

      const params: Api.SystemManage.DeptAddParams = {
        name: formData.name,
        parentId: formData.parentId
      }

      await fetchAddDept(params)
      ElMessage.success(dialogType.value === 'add' ? '添加成功' : '编辑成功')
      emit('submit')
    } catch (error) {
      console.error('提交失败:', error)
    }
  }
</script>

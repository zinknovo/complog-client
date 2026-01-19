<template>
  <ElDialog
    v-model="dialogVisible"
    :title="dialogType === 'add' ? '添加制度' : '编辑制度'"
    width="50%"
    align-center
  >
    <ElForm ref="formRef" :model="formData" :rules="rules" label-width="100px">
      <ElRow :gutter="20">
        <ElCol :span="12">
          <ElFormItem label="制度名称" prop="name">
            <ElInput v-model="formData.name" placeholder="请输入制度名称" />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="制度编号" prop="code">
            <ElInput v-model="formData.code" placeholder="请输入制度编号" />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow :gutter="20">
        <ElCol :span="12">
          <ElFormItem label="制度类型" prop="type">
            <ElSelect v-model="formData.type" placeholder="请选择制度类型" style="width: 100%">
              <ElOption label="公司章程" :value="1" />
              <ElOption label="三会议事规则" :value="2" />
              <ElOption label="内部规章制度" :value="3" />
              <ElOption label="业务规则指引" :value="4" />
            </ElSelect>
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="状态" prop="status">
            <ElSelect v-model="formData.status" placeholder="请选择状态" style="width: 100%">
              <ElOption label="草稿" :value="0" />
              <ElOption label="生效中" :value="1" />
              <ElOption label="已失效" :value="2" />
            </ElSelect>
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElRow :gutter="20">
        <ElCol :span="12">
          <ElFormItem label="生效日期" prop="effectiveDate">
            <ElDatePicker
              v-model="formData.effectiveDate"
              type="date"
              placeholder="请选择生效日期"
              style="width: 100%"
              value-format="YYYY-MM-DD"
            />
          </ElFormItem>
        </ElCol>
        <ElCol :span="12">
          <ElFormItem label="失效日期" prop="expiryDate">
            <ElDatePicker
              v-model="formData.expiryDate"
              type="date"
              placeholder="请选择失效日期（可选）"
              style="width: 100%"
              value-format="YYYY-MM-DD"
            />
          </ElFormItem>
        </ElCol>
      </ElRow>
      <ElFormItem label="负责部门ID" prop="ownerDeptId">
        <ElInputNumber
          v-model="formData.ownerDeptId"
          :min="0"
          placeholder="请输入负责部门ID（可选）"
          style="width: 100%"
        />
      </ElFormItem>
      <ElFormItem label="内容摘要" prop="contentSummary">
        <ElInput
          v-model="formData.contentSummary"
          type="textarea"
          :rows="3"
          placeholder="请输入内容摘要（可选）"
        />
      </ElFormItem>
      <ElFormItem label="文件路径" prop="contentFilePath">
        <ElInput v-model="formData.contentFilePath" placeholder="请输入文件路径（可选）" />
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
  import { fetchAddPolicy, fetchEditPolicy } from '@/api/policy'
  import { ElMessage } from 'element-plus'

  interface Props {
    visible: boolean
    type: string
    policyData?: Partial<Api.Policy.PolicyListItem>
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
    code: '',
    type: 1,
    status: 0,
    effectiveDate: '',
    expiryDate: '',
    ownerDeptId: undefined as number | undefined,
    contentSummary: '',
    contentFilePath: ''
  })

  // 表单验证规则
  const rules: FormRules = {
    name: [{ required: true, message: '请输入制度名称', trigger: 'blur' }],
    code: [{ required: true, message: '请输入制度编号', trigger: 'blur' }],
    type: [{ required: true, message: '请选择制度类型', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }]
  }

  // 监听数据变化，填充表单
  watch(
    () => props.policyData,
    (newData) => {
      if (newData) {
        formData.name = newData.name || ''
        formData.code = newData.code || ''
        formData.type = newData.type || 1
        formData.status = newData.status ?? 0
        formData.effectiveDate = newData.effectiveDate || ''
        formData.expiryDate = newData.expiryDate || ''
        formData.ownerDeptId = newData.ownerDeptId
        formData.contentSummary = (newData as any).contentSummary || ''
        formData.contentFilePath = (newData as any).contentFilePath || ''
      } else {
        formData.name = ''
        formData.code = ''
        formData.type = 1
        formData.status = 0
        formData.effectiveDate = ''
        formData.expiryDate = ''
        formData.ownerDeptId = undefined
        formData.contentSummary = ''
        formData.contentFilePath = ''
      }
    },
    { immediate: true }
  )

  // 监听对话框显示状态，重置表单
  watch(dialogVisible, (visible) => {
    if (!visible) {
      formRef.value?.resetFields()
    } else if (props.policyData) {
      formData.name = props.policyData.name || ''
      formData.code = props.policyData.code || ''
      formData.type = props.policyData.type || 1
      formData.status = props.policyData.status ?? 0
      formData.effectiveDate = props.policyData.effectiveDate || ''
      formData.expiryDate = props.policyData.expiryDate || ''
      formData.ownerDeptId = props.policyData.ownerDeptId
      formData.contentSummary = (props.policyData as any).contentSummary || ''
      formData.contentFilePath = (props.policyData as any).contentFilePath || ''
    }
  })

  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return

    try {
      await formRef.value.validate()

      const params: Api.Policy.PolicyAddParams | Api.Policy.PolicyEditParams = {
        name: formData.name,
        code: formData.code,
        type: formData.type,
        status: formData.status,
        effectiveDate: formData.effectiveDate || undefined,
        expiryDate: formData.expiryDate || undefined,
        ownerDeptId: formData.ownerDeptId,
        contentSummary: formData.contentSummary || undefined,
        contentFilePath: formData.contentFilePath || undefined
      }

      if (dialogType.value === 'edit' && props.policyData?.id) {
        params.id = props.policyData.id
        await fetchEditPolicy(props.policyData.id, params as Api.Policy.PolicyEditParams)
      } else {
        await fetchAddPolicy(params as Api.Policy.PolicyAddParams)
      }

      ElMessage.success(dialogType.value === 'add' ? '添加成功' : '编辑成功')
      emit('submit')
    } catch (error) {
      console.error('提交失败:', error)
      ElMessage.error(dialogType.value === 'add' ? '添加失败' : '编辑失败')
    }
  }
</script>

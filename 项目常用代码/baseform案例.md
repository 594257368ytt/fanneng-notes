```vue
<base-form
  ref="baseForm"
  v-model="Form"
  :formProps="formProps"
  :rules="rules"
></base-form>
<script>
data(){
    return{
        Form: {
        name: null,
        status: null,
        role: []
    },
    formProps: {
        name: {
          type: 'input',
          label: '成员昵称',
        },
        status: {
          type: 'radio',
          label: '成员状态',
          optionList: [
            {
              value: 1,
              label: '未激活',
            },
            {
              value: 2,
              label: '已激活',
            },
            {
              value: 3,
              label: '已禁用',
            },
          ],
        },
        role: {
          type: 'checkbox',
          label: '成员角色',
          optionList: [
            {
              value: 1,
              label: '管理员',
            },
            {
              value: 2,
              label: '作业员',
            },
          ],
        },
    },
    rules: {
        name: [
          { required: true, message: '不能为空', trigger: ['change', 'blur'] },
        ],
        status: [
          { required: true, message: '不能为空', trigger: ['change', 'blur'] },
        ],
        role: [
          { required: true, message: '不能为空', trigger: ['change', 'blur'] },
        ],
    },
    }
}
</script>

```


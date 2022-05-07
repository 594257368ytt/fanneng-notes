```vue
<base-table
      ref="table"
      :url="url"
      :method="method"
      :listName="listName"
      :isDebug="isDebug"
      :sortType="sortType"
      :sortField="sortField"
      :searchForm="searchForm"
      :columns="columns"
      :hasSelectionColumn="false"
      :hasIndexColumn="false"
      :advancedQueryEntry="false"
      @addTeam="addTeam"
    >
      <template #optColumn="{ row }">
        <span class="column-btn" @click="editRole(row.id)">编辑角色</span>
        <span class="column-btn" @click="deleteData(row.id)">删除</span>
      </template>
</base-table>
<script>
data(){
    return{
      url: 'member/list',
      method: 'post',
      listName: 'list',
      isDebug: false,
      editId: '',
      searchForm: {
        teamId: ''
      },
      sortField: 'create_time',
      sortType: 'desc',
      columns: [
        {
          key: 'id',
          label: '成员ID',
          width: 200,
        },
        {
          key: 'memberUserName',
          label: '成员昵称',
          width: 150,
        },
        {
          key: 'memberRole',
          label: '成员角色',
        },
        {
          key: 'memberStatus',
          label: '成员状态',
          width: 100,
        },
        {
          key: 'createTime',
          label: '创建时间',
          width: 140,
        },
        {
          key: 'optColumn',
          label: '操作',
          slotName: 'optColumn',
          width: 180,
        },
      ],
    }
}
</script>
```


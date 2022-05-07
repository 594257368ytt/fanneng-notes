```vue
<el-table
    :data="costractData.list"
    stripe
    style="width: 100%"
    :header-cell-style="{ background: '#EEF4FC' }"
>
</el-table>
<el-pagination
    action=""
    :page-sizes="[10, 20, 30, 40]"
    :page-size="10"//每页显示几条数据
    layout="total, sizes, prev, pager, next, jumper"
    :total="costractData.total - 0"//总页数
    @size-change="handleSizeChange"//每页显示数目改变
    @current-change="handleCurrentChange"//当前页改变
    :current-page="currentPage"//绑定当前页数
    accept=".doc,.pdf,.docx"//允许的文件格式
>
</el-pagination>
<script>
data(){
	// 默认显示第几页
	currentPage: 1,
	// 默认每页显示的条数（可修改）
	PageSize: 10,
    // 表格数据
    costractData: { list: [], total: 0 },
}
methods:{
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数，此处将总条数赋值给分页接口传参
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
    }
}
</script>
```


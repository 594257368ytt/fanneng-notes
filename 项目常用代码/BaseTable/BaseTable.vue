<template>
  <div class="base_table">
    <!--操作行-->
    <!--无高级搜索，搜索条件从左到右排列-->
    <div v-show="searchProps.length > 0" class="search_container">
      <div
        v-for="searchProp in searchProps"
        :key="`${searchProp.key}`"
        :class="searchProp.class"
      >
        <div class="search_item">
          <span class="label">{{ searchProp.label }}</span>
          <span class="content" :style="{ width: searchProp.width + 'px' }">
            <el-input
              v-if="searchProp.type === 'input'"
              v-model="searchFormT[searchProp.key]"
              :placeholder="searchProp.placeholder"
              @keyup.enter.native="$handleCurrentChange(1)"
              clearable
            >
            </el-input>
            <el-select
              v-if="searchProp.type === 'select'"
              v-model="searchFormT[searchProp.key]"
              :placeholder="searchProp.placeholder"
              :multiple="searchProp.multiple"
              :collapse-tags="searchProp.collapseTags"
              :disabled="searchProp.disabled"
              :filterable="searchProp.filterable"
              :remote="searchProp.remote"
              :reserve-keyword="searchProp.reserveKeyword"
              :remote-method="searchProp.remoteMethod"
              @change="
                searchProp.change &&
                  searchProp.change(searchFormT[searchProp.key], searchFormT)
              "
              clearable
            >
              <el-option
                v-for="(option, optionIndex) in searchProp.optionList"
                :key="`${key}_${optionIndex}`"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <treeselect
              v-if="searchProp.type === 'treeselect'"
              v-model="searchFormT[searchProp.key]"
              :options="searchProp.optionList"
              :disabled="searchProp.disabled"
              :placeholder="searchProp.placeholder"
              :normalizer="searchProp.normalizer"
            />
            <el-date-picker
              v-if="
                searchProp.type === 'datetimerange' ||
                searchProp.type === 'daterange' ||
                searchProp.type === 'year' ||
                searchProp.type === 'month' ||
                searchProp.type === 'date'
              "
              v-model="searchFormT[searchProp.key]"
              :type="searchProp.type"
              :format="searchProp.format || getFormat(searchProp.type)"
              :value-format="
                searchProp.valueFormat || getFormat(searchProp.type)
              "
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :placeholder="searchProp.placeholder"
              :pickerOptions="searchProp.pickerOptions"
              @change="
                searchProp.change &&
                  searchProp.change(searchFormT[searchProp.key], searchFormT)
              "
              clearable
            ></el-date-picker>
            <slot
              v-if="searchProp.type === 'slot'"
              :name="`${searchProp.slotName}`"
            />
          </span>
        </div>
      </div>
      <!--查询-->
      <div class="search_item">
        <el-button
          type="primary"
          v-preventReClick
          @click="$handleCurrentChange(1)"
          >搜索</el-button
        >
        <el-button class="reset-btn" v-preventReClick @click="$resetQuery()">
          <i class="el-icon-refresh-right"></i>
        </el-button>
      </div>
    </div>
    <div
      v-if="$scopedSlots.optRow || advancedSearchProps.length > 0"
      class="opt-container"
    >
      <!--操作列插槽，可插入按钮、开关等-->
      <div
        class="opt-slot"
        v-if="$scopedSlots.optRow"
        :style="{
          width: searchProps.length > 0 ? '100%' : 'calc(100% - 370px)',
        }"
      >
        <slot name="optRow" :selection="selection"></slot>
      </div>
      <!-- 高级搜索左侧按钮功能 -->
      <div
        v-if="advancedSearchProps.length > 0"
        class="normal-search"
        :style="{
          left: '34px',
        }"
      >
        <el-button 
          v-if="advancedSearchProps[1].type === 'btn'" 
          type="primary"
          @click="addTeam"
        >
          {{advancedSearchProps[1].label}}
        </el-button>
      </div>
      <!--高级搜索的普通搜索，条件居右显示-->
      <div
        v-if="advancedSearchProps.length > 0"
        class="normal-search"
        :style="{
          right: advancedSearchProps.length === 1 || advancedQueryEntry===false ? '2px' : '110px',
        }"
      >
        <el-input
          v-if="advancedSearchProps[0].type === 'input'"
          v-model="searchFormT[advancedSearchProps[0].key]"
          :placeholder="advancedSearchProps[0].placeholder"
          @keyup.enter.native="$handleCurrentChange(1)"
          clearable
        >
          <el-button
            slot="append"
            type="primary"
            @click="$handleCurrentChange(1)"
            >搜索</el-button
          >
        </el-input>
      </div>
      <!--高级搜索的高级搜索按钮，条件居右显示-->
      <div
        v-if="advancedSearchProps.length > 1 && advancedQueryEntry"
        class="advanced-search"
        @click="triggerAdvancedQuery"
      >
        <span class="name">高级查询</span>
        <i v-if="isAdvancedSearch" class="el-icon-arrow-down"></i>
        <i v-else class="el-icon-arrow-up"></i>
      </div>
    </div>
    <!--高级搜索的下拉条件，搜索条件从左到右排列-->
    <div
      v-show="advancedSearchProps.length > 1 && isAdvancedSearch"
      class="search_container"
    >
      <div
        v-for="(searchProp, index) in advancedSearchProps"
        :key="`${searchProp.key}`"
        :class="searchProp.class"
      >
        <div v-if="index != 0" class="search_item">
          <span class="label">{{ searchProp.label }}</span>
          <span class="content" :style="{ width: searchProp.width + 'px' }">
            <el-input
              v-if="searchProp.type === 'input'"
              v-model="advancedSearchFormT[searchProp.key]"
              :placeholder="searchProp.placeholder"
              @keyup.enter.native="$handleCurrentChange(1)"
              clearable
            >
            </el-input>
            <el-select
              v-if="searchProp.type === 'select'"
              v-model="advancedSearchFormT[searchProp.key]"
              :placeholder="searchProp.placeholder"
              :multiple="searchProp.multiple"
              :collapse-tags="searchProp.collapseTags"
              :disabled="searchProp.disabled"
              :filterable="searchProp.filterable"
              :remote="searchProp.remote"
              :reserve-keyword="searchProp.reserveKeyword"
              :remote-method="searchProp.remoteMethod"
              @change="
                searchProp.change &&
                  searchProp.change(
                    advancedSearchFormT[searchProp.key],
                    advancedSearchFormT
                  )
              "
              clearable
            >
              <el-option
                v-for="(option, optionIndex) in searchProp.optionList"
                :key="`${key}_${optionIndex}`"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <treeselect
              v-if="searchProp.type === 'treeselect'"
              v-model="advancedSearchFormT[searchProp.key]"
              :options="searchProp.optionList"
              :disabled="searchProp.disabled"
              :placeholder="searchProp.placeholder"
              :normalizer="searchProp.normalizer"
            />
            <el-date-picker
              v-if="
                searchProp.type === 'datetimerange' ||
                searchProp.type === 'daterange' ||
                searchProp.type === 'year' ||
                searchProp.type === 'month' ||
                searchProp.type === 'date'
              "
              v-model="advancedSearchFormT[searchProp.key]"
              :type="searchProp.type"
              :format="searchProp.format || getFormat(searchProp.type)"
              :value-format="
                searchProp.valueFormat || getFormat(searchProp.type)
              "
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :placeholder="searchProp.placeholder"
              :pickerOptions="searchProp.pickerOptions"
              @change="
                searchProp.change &&
                  searchProp.change(
                    advancedSearchFormT[searchProp.key],
                    advancedSearchFormT
                  )
              "
              clearable
            ></el-date-picker>
            <slot
              v-if="searchProp.type === 'slot'"
              :name="`${searchProp.slotName}`"
            />
          </span>
        </div>
      </div>
    </div>
    <!--列表-->
    <div class="table-container">
      <el-table
        ref="elTable"
        v-loading="loading"
        :element-loading-text="'正在为您拼命加载.........'"
        :data="tableData"
        :row-key="rowKey"
        :tree-props="{ children: childrenKey }"
        @selection-change="handleSelectionChange"
        @row-dblclick="handleRowDblclick"
      >
        <!--多选框-->
        <el-table-column
          v-if="hasSelectionColumn"
          type="selection"
          :selectable="selectable"
          align="center"
          width="40"
        ></el-table-column>
        <!--序号列-->
        <el-table-column
          v-if="hasIndexColumn"
          type="index"
          :index="getIndex"
          label="序号"
          align="center"
          width="60"
        ></el-table-column>
        <!--数据列-->
        <base-column
          v-for="(column, index) in columns"
          :key="`${column.key}_${index}`"
          :column="column"
        >
          <template
            v-for="(slotItem, slotKey) in $scopedSlots"
            v-slot:[slotKey]="{ row }"
          >
            <slot
              v-if="!['optRow'].includes(slotKey)"
              :name="slotKey"
              :row="row"
              :column="column"
            />
          </template>
        </base-column>
      </el-table>
    </div>
    <!--分页-->
    <div v-if="hasPagination" class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next, sizes, jumper"
        :current-page="pageObj.pageNum"
        :page-size="pageObj.pageSize"
        :total="pageObj.totalSize"
        @current-change="$handleCurrentChange"
        @size-change="$handleSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import BaseColumn from './BaseColumn'

export default {
  name: 'base_table',
  components: { BaseColumn },
  props: {
    // 请求地址
    url: String,
    // get/post请求
    method: String,
    // 返回对象列表的变量名
    listName: String,
    //是否显示高级查询功能
    advancedQueryEntry:{
      type: Boolean,
      default: true,
    },
    // 是否debug
    isDebug: {
      type: Boolean,
      default: true,
    },
    // （只有在当前请求接口异常复杂，组件不满足使用时，由调用方传入拼好的response，此时组件仅供展示使用，不负责查询接口）
    response: Object,
    /**
     * 列名列表
     *
     * [{
     *     key: '变量',
     *     label: '列名',
     *     width: 100,
     *     render: (h, row) => {
     *       return h('span', row[key])
     *     },
     *     columns: [...]
     * }]
     */
    columns: {
      type: Array,
      required: true,
    },
    // 每页查询条数
    pageSize: {
      type: Number,
      default: 20,
    },
    //排序方法
    sortType: {
      type: String,
      default: null,
    },
    //排序字段
    sortField: {
      type: String,
      default: null,
    },
    // 搜索条件默认传值
    searchForm: Object,
    // 普通搜索条件列表，和advancedSearchProps互斥
    searchProps: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 高级搜索条件列表，和searchProps互斥
    advancedSearchProps: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 是否存在多选框
    hasSelectionColumn: {
      type: Boolean,
      default: true,
    },
    // 是否存在序列行
    hasIndexColumn: {
      type: Boolean,
      default: true,
    },
    // 是否存在分页
    hasPagination: {
      type: Boolean,
      default: true,
    },
    // 是否一进页面查询
    isCreateQuery: {
      type: Boolean,
      default: true,
    },
    // 查询之前进行校验
    beforeQuery: {
      type: Function,
      default: () => {
        return true
      },
    },
    // 查询之后处理response
    afterQuery: Function,
    // 多选框筛选方法
    selectable: {
      type: Function,
      default: () => {
        return true
      },
    },
    // 加载树类型的数据，节点id
    rowKey: String,
    // 加载树类型的数据，子列表变量名
    childrenKey: String,
  },
  data() {
    return {
      isAdvancedSearch: false, //高级查询展开与否
      loading: true, //loading效果
      selection: [], // 多选框参数
      searchFormT: { ...this.searchForm }, //普通搜索条件
      advancedSearchFormT: {}, //高级搜索条件
      tableData: [],
      pageObj: {
        pageNum: 1,
        sortField: this.sortField,
        sortType: this.sortType,
        pageSize: this.pageSize,
        totalIndex: 1,
        totalSize: 0,
        currentSize: 0,
      },
    }
  },
  created() {
    // 搜索
    if (this.isCreateQuery) {
      this.$query()
    } else {
      this.loading = false
    }
  },
  watch: {
    searchForm: {
      handler: function (val) {
        for (const key in val) {
          this.$set(this.searchFormT, key, val[key])
        }
      },
      deep: true,
    },
    response: {
      handler: function (val) {
        this.searchFormT = { ...this.searchForm }
        this.$query()
      },
      deep: true,
    },
  },
  methods: {
    addTeam(){
      this.$emit("addTeam");
    },
    getFormat(type) {
      switch (type) {
        case 'date':
          return 'yyyy-MM-dd'
        case 'daterange':
          return 'yyyy-MM-dd'
        case 'month':
          return 'yyyy-MM'
        case 'year':
          return 'yyyy'
        default:
          return 'yyyy-MM-dd HH:mm:ss'
      }
    },
    $resetQuery() {
      this.resetSearchFormT()
      this.$handleCurrentChange(1)
    },
    $handleCurrentChange(val) {
      this.pageObj.pageNum = val
      this.$query()
    },
    $handleSizeChange(val) {
      this.pageObj.pageSize = val
      this.pageObj.pageNum = 1
      this.$query()
    },
    $addQuery() {
      this.resetSearchFormT()
      this.$handleCurrentChange(this.pageObj.totalIndex)
    },
    $deleteQuery() {
      if (this.pageObj.currentSize < 2) {
        this.pageObj.pageNum =
          this.pageObj.pageNum > 2 ? this.pageObj.pageNum - 1 : 1
      }
      this.$query()
    },
    $query() {
      // 初始化值
      this.loading = true
      // if (!this.childrenKey) {
      //   this.tableData = []
      // }

      const vm = this
      const advancedSearchProps = this.advancedSearchProps
      const searchProps = this.searchProps
      let searchFormT = { ...this.searchFormT }
      // 高级搜索混合普通搜索和高级搜索
      if (this.isAdvancedSearch) {
        searchFormT = Object.assign(searchFormT, this.advancedSearchFormT)
        // 处理特殊字段
        for (const searchProp in advancedSearchProps) {
          this.transformForm(searchFormT, searchProp)
        }
      }
      // 处理特殊字段
      for (const searchProp in searchProps) {
        this.transformForm(searchFormT, searchProp)
      }

      // 组装请求
      searchFormT = {
        page: this.pageObj.pageNum > 0 ? this.pageObj.pageNum - 1 : 0,
        pageSize: this.pageObj.pageSize,
        sortField: this.pageObj.sortField,
        sortType: this.pageObj.sortType,
        ...searchFormT,
      }
      console.log('searchFormT--------------------', searchFormT)

      if (vm.beforeQuery(searchFormT)) {
        if (vm.response) {
          vm.initRsp(vm.response)
        } else {
          if (vm.isDebug) {
            this.postDebug(vm, searchFormT)
          } else {
            this.$post(vm.url, searchFormT)
              .then((rsp) => {
                console.log('tableData--------------------', rsp)
                let rspT = rsp
                if (vm.afterQuery && vm.afterQuery instanceof Function)
                  rspT = vm.afterQuery(rsp)
                vm.initRsp(rspT)
              })
              .catch((err) => {})
          }
        }
      }
    },
    postDebug(vm, searchFormT) {
      vm.$axios({
        url: vm.url,
        method: vm.method,
        data: searchFormT,
        // params: searchFormT,
      })
        .then((rsp) => {
          console.log('tableData--------------------', rsp)
          let rspT = rsp
          if (vm.afterQuery && vm.afterQuery instanceof Function)
            rspT = vm.afterQuery(rsp)
          vm.initRsp(rspT)
        })
        .catch((err) => {})
    },
    transformForm(searchForm, searchProp) {
      const { key, type } = searchProp
      if (type === 'datetimerange' || type === 'daterange') {
        const timeRange = searchForm[key]
        if (timeRange && timeRange.length > 0) {
          searchForm[key] = {
            beginTime: timeRange[0],
            endTime: timeRange[1],
          }
        } else {
          searchForm[key] = null
        }
      }
    },
    initRsp(rsp) {
      if (this.isDebug) {
        this.initRspDebug(rsp)
      } else {
        const { total, [this.listName]: list } = rsp
        this.pageObj.totalSize = Number(total) || 0
        this.pageObj.currentSize = list ? list.length : 0
        this.tableData = list instanceof Array ? list : [list]
        this.loading = false
      }
    },
    initRspDebug(rsp) {
      const {
        code,
        message,
        data: { totalIndex, totalSize, [this.listName]: list },
      } = rsp.data
      if (code === 200) {
        this.pageObj.totalIndex = Number(totalIndex) || 1
        this.pageObj.totalSize = Number(totalSize) || 0
        this.pageObj.currentSize = list ? list.length : 0
        this.tableData = list instanceof Array ? list : [list]
        this.loading = false
      } else {
        this.$message({
          type: 'error',
          message: `${code}:${message}`,
        })
      }
    },
    resetSearchFormT() {
      this.searchFormT = { ...this.searchForm }
    },
    getIndex(i) {
      return (this.pageObj.pageNum - 1) * this.pageObj.pageSize + i + 1
    },
    triggerAdvancedQuery() {
      this.isAdvancedSearch = !this.isAdvancedSearch
    },
    handleSelectionChange(selection) {
      this.selection = selection
      this.$emit('selectionChange', selection)
    },
    handleRowDblclick(row, column, event) {
      this.$emit('rowDblclick', row)
    },
  },
}
</script>
<style lang="less" type="text/less" scoped>
/**表格**/
.base_table {
  /deep/ .el-button {
    padding: 8px 16px;
    font-size: 14px;
    line-height: 14px;
    &.reset-btn {
      padding: 8px;
      font-size: 16px;
      i {
        line-height: 14px;
      }
    }
    & + .el-button {
      margin-left: 8px;
    }
  }
  .opt-container {
    height: 32px;
    margin-bottom: 15px;
    position: relative;
    .normal-search {
      width: 250px;
      position: absolute;
      top: 0;
      /deep/.el-input {
        font-size: 14px;
        .el-input__icon,
        .el-input__inner {
          height: 32px;
          line-height: 32px;
        }
        .el-input-group__append {
          background: #1890ff;
          color: #fff;
        }
      }
    }
    .advanced-search {
      font-size: 14px;
      height: 32px;
      line-height: 32px;
      padding-right: 10px;
      text-align: right;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      .name {
        margin-right: 5px;
      }
    }
  }
  /**搜索框**/
  .search_container {
    display: flex;
    flex-wrap: wrap;
    padding: 0px 5px;
    width: 100%;
    margin-bottom: 10px;
    box-sizing: border-box;
    border-radius: 6px;
    > div {
      margin-bottom: 10px;
    }
    /deep/.search_item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .label {
        font-size: 14px;
        color: #666666;
        margin-right: 5px;
      }
      .el-input__inner,
      .el-range-separator,
      .el-input__icon {
        font-size: 14px;
        height: 32px;
        line-height: 32px;
      }
    }
  }
  .table-container {
    /deep/.el-table {
      &::before {
        background: transparent;
      }
      .el-loading-spinner {
        position: absolute;
        top: 200px;
        left: 0;
        background: none;
      }
      .el-table__body-wrapper {
        min-height: 390px;
      }
      th,
      td {
        padding: 0;
        font-size: 14px;
        font-weight: normal;
        &.is-leaf {
          border-bottom: none;
        }
        .cell {
          line-height: 38px;
          padding-left: 15px;
          padding-right: 5px;
          color: #5a5a5a;
        }
      }
      .el-table__header-wrapper,
      .el-table__fixed-header-wrapper {
        border: 1px solid #f2f2f2;
        border-radius: 4px;
        box-sizing: border-box;
        th,
        th {
          background: #fafafa;
          height: 38px;
          .cell {
            color: #000;
            font-weight: 500;
            line-height: 38px;
            font-size: 14px;
          }
        }
      }
      .el-table__fixed-right::before,
      .el-table__fixed::before {
        background-color: inherit;
      }
      .el-table__empty-text {
        text-align: left;
        position: absolute;
        width: 100%;
        left: 48%;
        top: 120px;
        font-size: 14px;
      }
      .column-btn {
        margin-right: 10px;
        font-size: 14px;
        color: #1890ff;
        cursor: pointer;
        &:hover {
          color: rgba(24, 144, 255, 0.5);
        }
      }
    }
  }
  .pagination-container {
    margin-top: 30px;
    /deep/.el-pagination {
      text-align: right;
      button,
      .el-pager li {
        background: #fff;
        border: 1px solid #e3e3e3;
        border-radius: 6px;
        font-size: 14px;
      }
      .el-input__inner {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        border-radius: 6px;
      }
      .el-pagination__sizes {
        font-size: 0;
        margin-left: 15px;
      }
      .el-pagination__jump {
        margin-left: 0;
        .el-pagination__editor {
          margin: 0 10px;
        }
      }
    }
  }
}
</style>

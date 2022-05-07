<template>
  <table class="label-table">
    <tr v-if="listProps && listProps.length > 0 && !hideTitle">
      <th v-for="({ title }, propIndex) in listProps" :key="propIndex">
        {{ title }}
      </th>
      <th></th>
    </tr>
    <tr
      v-for="(listItem, listIndex) in list"
      :key="listIndex"
      class="label-item"
    >
      <td v-for="(propItem, propIndex) in listProps" :key="propIndex">
        <LabelInput
          ref="labelInput"
          v-model="listItem[propItem.key]"
          :placeholder="propItem.placeholder"
          :rules="propItem.rules"
        />
      </td>
      <td class="opt-column">
        <!--删除-->
        <i
          v-if="listIndex === 0"
          class="label-item-icon el-icon-remove-outline"
          style="color: #fff; cursor: auto"
        ></i>
        <i
          v-else
          class="label-item-icon el-icon-remove-outline"
          @click="delItem(listIndex)"
        ></i>
        <!--添加-->
        <i
          class="label-item-icon el-icon-circle-plus-outline"
          @click="addItem(listIndex)"
        ></i>
        <img
          class="label-item-drag"
          src="../../../assets/images/label-drag.png"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import LabelInput from './LabelInput'
export default {
  components: { LabelInput },
  props: {
    // list列表的值
    value: {
      type: Array,
      default: () => {
        return [{ key: 'key', name: 'name' }]
      },
    },
    hideTitle: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    // input输入框的key,title,placeholder
    listProps: {
      type: Array,
      required: true,
      default: () => {
        return [
          {
            key: 'key',
            title: '标签key',
            placeholder: '标签key',
            rules: [
              {
                required: true,
                message: '不能为空',
              },
              {
                validator(rule, value, callback) {
                  if (value === 'd') {
                    callback(new Error('错误信息'))
                  } else {
                    callback()
                  }
                },
              },
            ],
            // 参考el-form rules写法
          },
          {
            key: 'name',
            title: '标签名称',
            placeholder: '标签名称',
            rules: [],
          },
        ]
      },
    },
  },
  data() {
    return {
      list: [],
      // hasChange: false,
    }
  },
  created() {
    this.list = this.value
  },
  watch: {
    value(val) {
      this.list = val
    },
    list(val) {
      this.$emit('input', val)
    },
  },
  methods: {
    addItem(index) {
      this.list.splice(index + 1, 0, {})
    },
    delItem(index) {
      this.list.splice(index, 1)
    },
    validate() {
      let valid = true
      if (this.$refs.labelInput) {
        this.$refs.labelInput.forEach((labelInputRef) => {
          if (!labelInputRef.validateInput()) {
            valid = false
          }
        })
      }
      return valid
    },
  },
}
</script>
<style lang="less" type="text/less" scoped>
.label-table {
  display: table-cell;
  table-layout: fixed;
  th {
    padding-right: 20px;
    &:last-child {
      padding-right: 0;
    }
  }
  td {
    padding-right: 20px;
    padding-bottom: 20px;
    height: 40px;
    /deep/.el-input {
      margin-right: 20px;
    }
    &.opt-column {
      display: flex;
      align-items: center;
      > i.label-item-icon {
        font-size: 22px;
        color: #b3b3b3;
        margin-right: 6px;
        cursor: pointer;
      }
      img.label-item-drag {
        width: 10px;
        height: 22px;
      }
    }
  }
}
</style>

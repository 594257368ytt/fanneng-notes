<template>
  <!--可编辑-->
  <el-form
    ref="baseForm"
    :class="['base-form', formClass]"
    :rules="rules"
    :model="form"
  >
    <template v-for="(item, key) in formProps">
      <el-form-item
        v-if="item && !item.hidden"
        :prop="key"
        :label="`${item.label}`"
        :key="`${key}`"
        :class="[item.class]"
        :style="[
          item.style,
          {
            width: item.width || formItemWidth,
          },
        ]"
        inline
      >
        <!-- solt -->
        <slot v-if="item.type === 'slot'" :name="`${item.slotName}`" />
        <!-- 普通文本 -->
        <span v-if="item.type === 'text'">{{ form[key] || '-' }}</span>
        <!-- 输入框 || 文本框-->
        <el-input
          v-if="item.type === 'textarea' || item.type === 'input'"
          v-model="form[key]"
          :type="item.type"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :resize="item.resize"
          :autosize="item.autosize"
          @change="item.blur && item.change(form[key], form, formEl)"
        >
          <template v-if="item.prepend" slot="prepend">
            {{ item.prepend }}
          </template>
          <template v-if="item.append" slot="append">{{
            item.append
          }}</template>
        </el-input>
        <!--计数器-->
        <el-input-number
          v-if="item.type === 'inputNumber'"
          v-model="form[key]"
          :controls-position="item.controlsPosition"
          :min="item.min"
          :max="item.max"
          :precision="item.precision"
          :step="item.step"
          @change="item.change && item.change(form[key], form, formEl)"
        />
        <!-- 选择框 -->
        <el-select
          v-if="item.type === 'select'"
          v-model="form[key]"
          :placeholder="item.placeholder"
          :multiple="item.multiple"
          :collapse-tags="item.collapseTags"
          :disabled="item.disabled"
          :clearable="item.clearable"
          :filterable="item.filterable"
          :remote="item.remote"
          :reserve-keyword="item.reserveKeyword"
          :remote-method="item.remoteMethod"
          @change="item.change && item.change(form[key], form, formEl)"
        >
          <el-option
            v-for="(option, optionIndex) in item.optionList"
            :key="`${key}_${optionIndex}`"
            :label="item.props ? option[item.props.label] : option.label"
            :value="item.props ? option[item.props.value] : option.value"
          />
        </el-select>
        <!-- 日期选择器 -->
        <el-date-picker
          v-if="
            item.type === 'date' ||
            item.type === 'datetime' ||
            item.type === 'month' ||
            item.type === 'year' ||
            item.type === 'datetimerange' ||
            item.type === 'daterange'
          "
          v-model="form[key]"
          :type="item.type"
          :placeholder="item.placeholder"
          :format="item.format || getTimeFormat(item.type)"
          :value-format="item.valueFormat || getTimeFormat(item.type)"
          :disabled="item.disabled"
          :picker-options="item.pickerOptions"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
        ></el-date-picker>
        <!-- 时间选择器 -->
        <el-time-picker
          v-if="item.type === 'timePicker'"
          type="datetime"
          v-model="form[key]"
          value-format="hh:mm:ss"
          :placeholder="item.placeholder"
        ></el-time-picker>
        <!--checkBox-->
        <el-checkbox-group v-if="item.type === 'checkbox'" v-model="form[key]">
          <el-checkbox
            v-for="option in item.optionList"
            :key="`${key}_${option.value}`"
            :label="option.value"
            >{{ option.label }}</el-checkbox
          >
        </el-checkbox-group>
        <!--switch-->
        <el-switch
          v-if="item.type === 'switch'"
          v-model="form[key]"
          :active-text="item.activeText"
          :active-value="item.activeValue"
          :inactive-text="item.inactiveText"
          :inactive-value="item.inactiveValue"
          @change="item.change && item.change(form[key], form, formEl)"
        ></el-switch>
        <!--文件上传-->
        <el-upload
          v-if="item.type === 'upload'"
          multiple
          class="el-upload-box el-upload-simple-box"
          :class="[
            {
              'el-upload-box--drag': item.drag,
            },
          ]"
          :action="item.url"
          :show-file-list="item.showFileList"
          :on-remove="item.remove"
          :drag="item.drag"
          :on-change="item.change"
          :on-success="item.success"
          :on-error="item.error"
          :limit="item.limit"
          :before-upload="item.beforeUpload"
          :before-remove="item.beforeRemove"
          :http-request="item.httpRequest"
          :file-list="item.fileList"
          :headers="item.headers"
          :name="item.name"
          :on-preview="item.onPreview"
          :disabled="item.disabled"
          :auto-upload="item.autoUpload"
        >
          <el-button v-if="!item.drag" type="primary">选择文件</el-button>
          <span v-else>将本地文件拖入框中上传</span>
          <div slot="tip" class="el-upload__tip">{{ item.tip }}</div>
        </el-upload>
        <!-- 单选框组 -->
        <el-radio-group v-if="item.type === 'radio'" v-model="form[key]">
          <el-radio
            v-for="(option, optionIndex) in item.optionList"
            :key="`${key}_${option.value}_${optionIndex}`"
            :label="option.value"
            :disabled="option.disabled"
            >{{ option.label }}</el-radio
          >
        </el-radio-group>
        <!-- label列表 -->
        <LabelList
          ref="labelList"
          v-if="item.type === 'labelList'"
          v-model="form[key]"
          :list-props="item.listProps"
          @change="item.change && item.change(form[key], form, formEl)"
        >
        </LabelList>
        <div class="base-form-tip" v-if="item.tipMessage">
          {{ item.tipMessage }}
        </div>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
export default {
  name: 'BaseForm',
  provide() {
    return {
      baseForm: this,
    }
  },
  props: {
    value: Object, // form表单的值，使用方法v-model
    // form表单要展示的各类组件，其中type必传，label可传，其他按需传入
    // formProps: {
    //   markType: {
    //     type: 'radio',
    //     label: '标注类型',
    //     tipMessage:'提示信息',
    //     optionList: [
    //       {
    //         value: 1,
    //         label: '短文本单链接',
    //       },
    //       {
    //         value: 2,
    //         label: '短文本多链接',
    //       },
    //     ],
    //   },
    // },
    formProps: {
      type: Object,
      required: true,
    },
    rules: Object,
    formClass: String,
    formItemWidth: {
      type: String,
      default: '100%',
    },
  },
  data() {
    return {
      form: {},
      formEl: {},
      headers: {},
    }
  },
  created() {
    this.form = { ...this.value }
  },
  mounted() {
    this.formEl = this.$refs.baseForm
  },
  watch: {
    value: {
      handler(val) {
        this.form = val
      },
      deep: true,
    },
    form: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true,
    },
    formProps: {
      handler: function (val, oldVal) {
        for (const key in val) {
          if (!val[key]) {
            this.form[key] = null
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    inputCheck() {
      let pass = true
      this.$refs.baseForm.validate((valid) => {
        if (valid) {
          return true
        } else {
          pass = false
          return false
        }
      })
      return pass
    },
    clearValidate() {
      this.$refs.baseForm.clearValidate()
    },
    validateField(key) {
      this.$refs.baseForm.validateField(key)
    },
    validate() {
      let validT = true
      if (this.$refs.labelList) {
        this.$refs.labelList.forEach((labelListRef) => {
          if (!labelListRef.validate()) {
            validT = false
          }
        })
      }
      if (validT) {
        this.$refs.baseForm.validate((valid) => {
          validT = valid
        })
      }
      return validT
    },
    changeValue(value, key) {
      this.$set(this.form, key, value)
      this.$nextTick(() => {
        this.$refs.baseForm.validateField(key)
        this.formProps[key].change(value, this.form, this.formEl)
      })
    },
    getTimeFormat(type) {
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
  },
}
</script>
<style lang="less" type="text/less" scoped>
.base-form {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  /deep/.el-form-item {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    .el-form-item__label {
      width: 100px;
      text-align: left;
      padding: 0;
      display: block;
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      color: #666666;
      &::before {
        display: inline-block;
        width: 4px;
        content: '';
        margin-right: 2px;
      }
    }
    .el-form-item__content {
      width: calc(100% - 130px);
      line-height: 36px;
      margin-left: 10px;
    }
    &.no-inline {
      display: block;
      .el-form-item__content {
        clear: both;
        width: 100%;
      }
    }
    &.is-error {
      .vue-treeselect__control {
        border-color: #fc2424;
      }
      .base-upload {
        border-color: #fc2424;
      }
      .base-upload__tip {
        display: none;
      }
    }
  }

  .el-input,
  .el-input-group,
  .el-date-editor,
  .el-range-editor,
  .el-select {
    width: 100%;
    .el-input__inner,
    .el-input__icon {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
    }
    .el-input__inner {
      color: #222b44;
    }
    .el-range-input {
      height: 35px;
      line-height: 35px;
    }
  }

  .el-upload {
    width: 100%;
    .iconfont {
      color: #a9b2b7;
      position: absolute;
      right: 8px;
      font-size: 16px;
    }
    .el-upload-simple {
      border: 1px solid #dedede;
      box-sizing: border-box;
      height: 36px;
      line-height: 36px;
    }
  }

  .el-textarea {
    line-height: 1.8;
    .el-textarea__inner {
      display: inline-block;
      min-height: 36px;
      height: 80px;
      font-size: 14px;
      color: #222b44;
    }
  }
  .el-tree {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    min-height: 36px;
    padding: 6px;
  }
  .el-upload-box {
    .el-upload__tip {
      margin-top: 0;
      line-height: 2;
      padding-left: 5px;
      font-size: 14px;
    }
    .el-upload-list__item {
      margin-top: 0;
      font-size: 14px;
    }
    .el-upload-dragger {
      height: 36px;
    }
    &.el-upload-box--drag {
      .el-upload {
        display: block;
        width: 100%;
      }
      .el-upload-dragger {
        width: 100%;
      }
    }
  }
  .base-form-tip {
    color: #5e6d82;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
  .is-error {
    .base-form-tip {
      display: none;
    }
  }
}
</style>

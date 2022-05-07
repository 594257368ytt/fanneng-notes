<template>
  <div class="label-input">
    <el-input
      :class="valid ? 'success' : 'error'"
      v-model="inputValue"
      :placeholder="placeholder"
      @blur="validateInput"
      @input="validateInput"
    ></el-input>
    <span v-show="errorMessage" class="error-tip">{{ errorMessage }}</span>
  </div>
</template>

<script>
export default {
  name: 'LabelInput',
  props: {
    value: String,
    placeholder: String,
    rules: [Array, Object],
  },
  data() {
    return {
      inputValue: this.value,
      errorMessage: '',
      valid: true,
    }
  },
  watch: {
    value(val) {
      this.inputValue = val
    },
    inputValue(val) {
      this.$emit('input', val)
    },
  },
  methods: {
    validateInput() {
      const val = this.inputValue
      const rules = this.rules
      this.valid = true
      this.errorMessage = ''

      // 判断是否为空
      if (rules && rules.length) {
        rules.every((rule) => {
          if (
            rule.required &&
            (val === '' || val === null || val === undefined)
          ) {
            this.valid = false
            this.errorMessage = rule.message
            return false
          }
          return true
        })
      }

      // 判断validate写法
      if (this.valid && rules && rules.length) {
        rules.every((rule) => {
          if (rule.validator) {
            rule.validator(rule, val, this.callback)
            return false
          }
          return true
        })
      }
      return this.valid
    },
    callback(error) {
      if (error) {
        this.valid = false
        this.errorMessage = error.message
        // console.error(error.message)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.label-input {
  width: 200px;
  position: relative;
  .success {
    /deep/ .el-input__inner {
      border-color: #c0c4cc;
      &:focus {
        border-color: #c0c4cc;
      }
    }
  }
  .error {
    /deep/ .el-input__inner {
      border-color: #f56c6c;
      &:focus {
        border-color: #f56c6c;
      }
    }
  }
  .error-tip {
    position: absolute;
    color: #f56c6c;
    font-size: 12px;
    margin-top: 2px;
    line-height: 1;
  }
}
</style>

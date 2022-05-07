<template>
  <el-breadcrumb class="base-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in menuList"
        :key="`${item.path}_${index}`"
      >
        <i v-if="hasBack" class="el-icon-arrow-left" @click="goBack"></i>
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    hasBack: Boolean,
    routePath: String,
  },
  data() {
    return {
      menuList: null,
    }
  },
  created() {
    this.getBreadcrumb()
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    },
  },
  methods: {
    goBack() {
      if (this.routePath) {
        this.$router.push(this.routePath)
      } else {
        this.$router.back()
      }
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      this.menuList = matched.filter((item) => item.meta && item.meta.title)
    },
  },
}
</script>

<style lang="less" type="text/less" scoped>
.base-breadcrumb {
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  color: #000;
  font-weight: bold;
  /deep/.el-breadcrumb-item {
    cursor: text;
  }
  /deep/.el-breadcrumb__inner {
    display: flex;
    align-items: center;
  }
  /deep/.el-icon-arrow-left {
    font-size: 22px;
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>

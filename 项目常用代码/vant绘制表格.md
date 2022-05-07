```vue
<template>
  <div class="box">
    <van-collapse v-model="activeNames">
    <van-collapse-item :title="activeNames.length > 0 ?'收起':'查看详情'" name="1">
      <div class="power-lever">
        <ul>
          <li>100kw等级</li>
          <li v-for="(item, index) in oneHundredLevel" :key="index">
            {{ item }}
          </li>
        </ul>
        <ul>
          <li>300kw等级</li>
          <li v-for="(item, index) in ThreeHundredLevel" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </van-collapse-item>
  </van-collapse>
  </div>
</template>

<script>
export default {
  props: {

  },
  data () {
    return {
      oneHundredLevel: [
        '兰西贝斯特一期',
        '兰西贝斯特二期',
        '新奥新奥科技园C座',
        '上海临港新奥动力',
        '保定铃吉',
        '绍兴创富邦',
        '长治创蓝',
        '安徽昌信',
        '上海九环',
        '龙游浙香',
        '石家庄燃气办公楼',
        '胜利油田田桩52接转站',
        '杭州贝伊达'
      ],
      ThreeHundredLevel: [
        '永康凯丰',
        '洛阳榕拓',
        '青岛君明盛',
        '威海文登经开区',
        '台州彩之源',
        '长沙远大城',
        '',
        '广州东涌燕麦',
        '安徽池杭',
        '',
        '',
        '',
        ''
      ],
      activeNames: ['1']
    }
  },

  components: {},

  computed: {},

  methods: {
  }
}
</script>
<style lang="less" type="text/less" scoped>
.box{
  .power-lever {
    margin-top: 18px;
    display: flex;
    border: 1px solid #d8d8d8;
    ul:first-child{
      border-right: 1px solid #d8d8d8;
    }
    ul {
      li {
        width: 133px;
        height: 32px;
        margin: 0 auto;
        line-height: 32px;
        padding-left: 13px;
      }
      li:not(:first-child){
        border-top: 1px solid #d8d8d8;
      }
      li:first-child {
        background-color: rgba(7, 128, 237, 0.1);
      }
    }
  }
  /deep/.van-collapse-item__content{
    color: #333333;
  }
  /deep/.van-cell__title {
    flex: none;
    color: #0780ED;
  }
  /deep/.van-cell {
    align-items: center;
    justify-content: center;
  }
}
</style>

```


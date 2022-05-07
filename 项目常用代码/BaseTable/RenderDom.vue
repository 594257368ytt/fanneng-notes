<script>
// 在template中渲染render函数的组件
export default {
  name: 'RenderDom',
  functional: true,
  props: {
    row: Object,
    renderFunc: Function,
  },
  render: function (h, ctx) {
    return ctx.props.renderFunc(h, ctx.props.row)
  },
}
</script>

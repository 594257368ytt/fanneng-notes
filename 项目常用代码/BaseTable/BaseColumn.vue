<template>
  <el-table-column
    v-if="column.show != false"
    :prop="column.key"
    :label="column.label"
    :width="column.width"
    :align="column.align"
    :fixed="column.fixed"
    :class-name="column.class"
    :show-overflow-tooltip="true"
  >
    <template #default="{ row }">
      <render-dom
        v-if="column.render"
        :render-func="column.render"
        :row="row"
      ></render-dom>
      <slot
        v-else-if="column.slotName"
        :name="column.slotName"
        :row="row"
        :column="column"
      ></slot>
      <span v-else>{{
        row[column.key] || row[column.key] === 0 ? row[column.key] : '-'
      }}</span>
    </template>
    <base-column
      v-for="(columnB, index) in column.columns"
      :key="`${columnB.key}_${index}`"
      :column="columnB"
    ></base-column>
  </el-table-column>
</template>

<script>
import RenderDom from './RenderDom'

export default {
  name: 'BaseColumn',
  components: { RenderDom },
  props: {
    column: Object,
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {},
}
</script>
<style lang="scss" scoped></style>

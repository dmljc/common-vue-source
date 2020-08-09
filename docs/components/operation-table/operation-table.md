### OperationTable

<component-wrap title="render表格" describition="大部分表格是通过通过声明式代码去描述，该组件允许以数据驱动，即命令式的方式去写表格">
<operation-table-base />
</component-wrap>

::: code
<<< docs/components/operation-table/base.vue
:::

<component-wrap title="自带分页功能" describition="如果定义了page-size属性，则表格自带分页功能，同时还需要提供page-no, total属性，并处理size-change事件和current-change事件，通常这些事件已经定义在common-vue的listMixin里">
<operation-table-advance-page />
</component-wrap>

::: code
<<< docs/components/operation-table/advance-page.vue
:::

<component-wrap title="表格列勾选及排序" describition="通过columns增加{type: selection}增加勾选列,同时实现select-change事件处理勾选逻辑；通过配置colunm sortable属性实现列可排序，同时实现sort-change事件处理排序逻辑；">
<operation-table-advance-column />
</component-wrap>

::: code
<<< docs/components/operation-table/advance-column.vue
:::

<component-wrap title="表格列可定制" describition="通过配置table-name属性可快速实现表格列定制，table-name取名规范为大写【模块-页面-表格】">
<operation-table-advance-custom />
</component-wrap>

::: code
<<< docs/components/operation-table/advance-custom.vue
:::

<table-wrap-attrs :list="attrs" />
<table-wrap-attrs title="Column配置说明" :list="columnAttrs" />
<table-wrap-events :list="events" />

<script>
export default {
    data() {
        return {
            attrs: [
                {name: 'tableName', desc: '表格唯一key, 如果定义了该值，则表格可由用户自定义展示列', type: 'String', optional: 'Any String', default: ''},
                {name: 'columns', desc: '表格列描述结构，由多个column结构组成的，column结构详见下面的column说明', type: 'Array', optional: '[column, ...]', default: '[]'},
                {name: 'data', desc: '表格数据源', type: 'Array', optional: 'Array', default: '[]'},
                {name: 'emptyText', desc: '表格无条目时的文本提示', type: 'String', optional: 'Any String', default: '搜索结果为空，请重新输入搜索内容'},
                {name: 'maxHeight', desc: '表格最大高度', type: 'Number', optional: 'Number', default: '500'},
                {name: 'pageSize', desc: '表格分页大小，定义了此属性，则表格自带分页功能', type: 'Number', optional: 'Number', default: ''},
                {name: 'pageNo', desc: '表格分页当前页数', type: 'Number', optional: 'Number', default: ''},
                {name: 'total', desc: '表格分页总条数', type: 'Number', optional: 'Number', default: ''}
            ],
            columnAttrs: [
                {name: 'type', desc: '该列是否为勾选列', type: 'String', optional: 'selectionn', default: '' },
                {name: 'label', desc: '该列的表头文本', type: 'String', optional: 'Any String', default: ''},
                {name: 'prop', desc: '该列数据取值的key值', type: 'String', optional: 'Any String', default: ''},
                {name: 'fixed', desc: '该列是否固定', type: 'Boolean', optional: 'Boolean', default: ''},
                {name: 'sortable', desc: '该列是否排序', type: 'Boolean', optional: 'Boolean', default: ''},
                {name: 'render', desc: '提供列单元格自定义函数渲染功能，函数会暴露出row信息，返回文本或vnode均可', type: 'Function', optional: 'Function'},
                {name: '其他', desc: '拥有大部分常用呢的el-table-column的属性配置，详见el-table文档'}
            ],
            events: [
                {name: 'size-change', desc: '表格带分页功能时，分页大小选择发生变化时触发', params: 'pageSize'},
                {name: 'current-change', desc: '表格带分页功能时，当前页数发生变化时触发', params: 'pageNo'},
                {name: 'sort-change', desc: '表格列排序发生变化时触发', params: '{column, prop, order}, 同el-table，详见el-table文档'},
                {name: 'selection-change', desc: '表格行勾选发生变化时触发', params: 'selection, 同el-table，详见el-table文档'}
            ]
        }
    }
}
</script>
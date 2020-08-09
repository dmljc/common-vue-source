### Export File

<component-wrap title="基本用法" describition="导出查询条件下所有数据">
<export-file-base />
</component-wrap>

::: code
<<< docs/components/export-file/base.vue
:::


<component-wrap title="导出范围选择" describition="自定义弹窗标题，导出前选择导出范围【会抛出export事件，前端需要自行处理逻辑，同时需要后端配合】">
<export-file-advance-1 />
</component-wrap>

::: code
<<< docs/components/export-file/advance-1.vue
:::

<table-wrap-attrs :list="attrs" />
<table-wrap-events :list="events" />

<script>
export default {
    data() {
        return {
            attrs: [
                {name: 'title', desc: '弹窗标题', type: 'String', optional: 'Any String', default: '导出'},
                {name: 'type', desc: '导出方式', type: 'String', optional: 'confirm | rangeCheck', default: 'confirm'},
                {name: 'visible', desc: '弹窗显示和隐藏', type: 'Boolean', optional: 'Boolean', default: 'false'}
            ],
            events: [
                {name: 'export', desc: '确认导出点击时触发', params: 'range: 选择范围模式下，用户选择的导出范围;1: 当前筛选条件下所有数据, 2: 当前页选中数据'}
            ]
        }
    }
}
</script>
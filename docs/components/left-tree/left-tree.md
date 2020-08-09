### LeftTree

<component-wrap title="基本用法" describition="用于业务中左侧搜索选择，右侧进行展示或配置的场景。">
<left-tree-base />
</component-wrap>

::: code
<<< docs/components/left-tree/base.vue
:::

<component-wrap title="自定义" describition="可自定义左侧宽度，可自定义左侧列表数据源的key值，可定制右侧业务逻辑">
<left-tree-advance-1 />
</component-wrap>

::: code
<<< docs/components/left-tree/advance-1.vue
:::

<table-wrap-attrs :list="attrs" />
<table-wrap-events :list="events" />

<script>
export default {
    data() {
        return {
            attrs: [
                {name: 'width', desc: '左侧列表宽度', type: 'String', optional: 'width String', default: '229px'},
                {name: 'source', desc: '左侧数据源', type: 'Array', optional: 'Array', default: '[]'},
                {name: 'nameKey', desc: '左侧数据源name key', type: 'String', optional: 'Any String', default: 'name'},
                {name: 'valueKey', desc: '左侧数据源value key', type: 'String', optional: 'Any String', default: 'id'},
                {name: 'value', desc: '左侧选中条目的value，通过v-model使用', type: 'String|Number', optional: 'String|Number', default: 'null'},
                {name: 'placeholder', desc: '左侧搜索的占空文本', type: 'String', optional: 'Any String', default: '模糊搜索'},
                {name: 'emptyText', desc: '左侧数据未选中时，右侧标题占空文本', type: 'String', optional: 'Any String', default: '未选择条目'},
                {name: 'init', desc: '是否初始默认选中左侧列表第一项', type: 'Boolean', optional: 'Boolean', default: 'false'}
            ],
            events: [
                {name: 'change', desc: '左侧数据选中发生变化时触发', params: 'item: 左侧选中数据对象'}
            ]
        }
    }
}
</script>
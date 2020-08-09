### 详情页头部

<!-- base -->
<component-wrap title="基本用法" describition="用于详情页表头的统一交互，展示表单，子标题，状态，操作等关键信息，随着页面滚动可悬浮在窗口顶部">
<detail-header-base />
</component-wrap>

::: code
<<< docs/components/detail-header/base.vue
:::

<!-- advance-1 -->
<component-wrap title="带子标题和状态">
<detail-header-advance-1 />
</component-wrap>

::: code
<<< docs/components/detail-header/advance-1.vue
:::

<!-- advance-2 -->
<component-wrap title="带操作按钮" describition="通过operation插槽可任意自定义按钮">
<detail-header-advance-2 />
</component-wrap>

::: code
<<< docs/components/detail-header/advance-2.vue
:::


<table-wrap-attrs :list="attrs" />

<script>
export default {
    data() {
        return {
            attrs: [
                {name: 'header', desc: '标题', type: 'String', optional: 'Any String'},
                {name: 'sub-header', desc: '子标题', type: 'String', optional: 'Any String'},
                {name: 'status', desc: '状态', type: 'String', optional: 'Any String'},
            ]
        }
    }
}
</script>
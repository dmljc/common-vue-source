### OperationCard

<component-wrap title="基本用法" describition="用于业务中可折叠的卡片">
<operation-card-base />
</component-wrap>

::: code
<<< docs/components/operation-card/base.vue
:::

<component-wrap title="带操作" describition="可自定义子标题，可自定义操作按钮">
<operation-card-advance-button />
</component-wrap>

::: code
<<< docs/components/operation-card/advance-button.vue
:::

<table-wrap-attrs :list="attrs" />

<script>
export default {
    data() {
        return {
            attrs: [
                {name: 'header', desc: '卡片标题', type: 'String', optional: 'Any String', default: ''},
                {name: 'sub-header', desc: '卡片子标题', type: 'String', optional: 'Any String', default: ''},
                {name: 'collapse', desc: '卡片是否可折叠', type: 'Boolean', optional: 'Boolean', default: 'false'}
            ]
        }
    }
}
</script>
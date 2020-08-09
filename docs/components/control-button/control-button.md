### Control Button

<component-wrap title="基本用法" describition="使用完全同el-button, 若不支持el-button的属性可随时动态增加，通过在点击回调中调用e.resolve实现防重复提交">
<control-button-base />
</component-wrap>

::: code
<<< docs/components/control-button/base.vue
:::

<table-wrap-events :list="events" />

<script>
    export default {
        data() {
            return {
                events: [
                    {name: 'click', desc: '按钮点击时触发', params: 'e: 事件的event对象，对象上扩展了resolve方法，调用resolve方法可以使按钮恢复可点击状态'}
                ]
            }
        }
    }
</script>


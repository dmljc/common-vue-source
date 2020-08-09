### OperationLogDialog

<component-wrap title="基本用法" describition="用于业务中弹窗显示操作日志的场景">
<operation-log-dialog-base />
</component-wrap>

::: code
<<< docs/components/operation-log-dialog/base.vue
:::

<table-wrap-attrs :list="attrs" />

<script>
export default {
    data() {
        return {
            attrs: [
                {name: 'visible', desc: '弹窗显示或隐藏', type: 'Boolean', optional: 'Boolean', default: 'false'},
                {name: 'format', desc: '日志展示形式，单行|多行', type: 'String', optional: 'oneline | multiline', default: 'oneline'},
                {name: 'list', desc: '日志数据源', type: 'Array', optional: 'Array', default: '[]'},
                {name: 'timestamp', desc: '日志中的时间字段是否为时间戳，若是，组件内会自动转换为时间字符串格式', type: 'Boolean', optional: 'Boolean', default: 'false'},
                {name: 'model', desc: '日志数据键配置', type: 'Object', optional: '配置对象中四个字段的键值来兼容后端的数据结构，最好在统一让后端日志模块直接返回以下结构。{author,date,content,remark}', default: '{author,date,content,remark}'}
            ]
        }
    }
}
</script>
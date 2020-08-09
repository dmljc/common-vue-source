### Import File

<component-wrap title="基本用法" describition="用于业务中通过excel导入数据的场景；组件接受的数据格式为规范数据格式，{code,result,message}，任何不符合组件数据格式的后端返回数据需要通过onLoadInterceptor进行转换">
<import-file-base />
</component-wrap>

::: code
<<< docs/components/import-file/base.vue
:::

<component-wrap title="异步下载模板" describition="用于业务中模板非静态模板，而是后端动态生成的场景；默认将发起get请求，不可配，后端接口返回数据格式应遵循前端规范，返回result.resultUrl，否则下载将失败。">
<import-file-advance-async />
</component-wrap>

::: code
<<< docs/components/import-file/advance-async.vue
:::

<component-wrap title="导入携带额外数据" describition="用于业务中导入需要关联单号或其他需要额外数据的场景;配置extraData参数，组件会自动组装好FormData">
<import-file-advance-extra />
</component-wrap>

::: code
<<< docs/components/import-file/advance-extra.vue
:::

<table-wrap-attrs :list="attrs" />

<script>
export default {
    data() {
        return {
            attrs: [
                {name: 'visible', desc: '弹窗显示或隐藏', type: 'Boolean', optional: 'Boolean', default: 'false'},
                {name: 'title', desc: '弹窗标题', type: 'String', optional: 'Any String', default: '导入'},
                {name: 'accept', desc: '允许导入的文件类型', type: 'String', optional: '.文件名后缀，逗号分割，或任意MIME_type', default: '.xlsx,.xls'},
                {name: 'extraData', desc: '导入附带的数据', type: 'Object', optional: 'Any Object', default: '{}'},
                {name: 'templateUrl', desc: '模板下载链接', type: 'String', optional: 'Any valid download url', default: ''},
                {name: 'downloadAsync', desc: '模板下载是否异步, 如果配置为true，将发起异步请求，后端需要文件下载地址以进行下载；', type: 'Boolean', optional: 'Boolean', default: 'false'},
                {name: 'importUrl', desc: '导入接口请求地址', type: 'String', optional: 'Any valid interface url', default: ''},
                {name: 'onLoadInterceptor', desc: '导入请求成功后的拦截，可用来处理数据格式的转换，以符合组件数据格式要求', type: 'Function', optional: 'Function', default: 'res => res'},
                {name: 'onSuccessCb', desc: '请求和处理完全成功后回调，可用来处理后续业务逻辑', type: 'Function', optional: 'Function', default: 'null'}
            ]
        }
    }
}
</script>
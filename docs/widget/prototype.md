## $audit
##### 用在审核场景直接调用，不需要再写弹窗以及审核逻辑，通过type指定通过或驳回，通过callback执行请求等业务逻辑

<component-wrap>
<el-button id="button-audit" type="primary" @click="$audit({type: 'pass', callback: () => {}})">审核通过</el-button>
<el-button type="primary" @click="$audit({type: 'reject', callback: () => {}})">审核驳回</el-button>
</component-wrap>

::: code
```
<el-button type="primary" @click="$audit({type: 'pass', callback: () => {}})">审核通过</el-button>
<el-button type="primary" @click="$audit({type: 'reject', callback: () => {}})">审核驳回</el-button>
```
:::

<table-wrap-methods :list="auditMethods" />


## $formatTime
##### 参见工具函数formatTime


## $number
##### 参见工具函数number


## $export
##### 用于业务中列表页导出excel的场景，该方法为get请求，后端需要在result.resultUrl中返回excel下载链接；post方法请使用$postExport

<component-wrap>
<el-button type="primary" @click="$export('xxx', {extra: 'data'})">导出</el-button>
<control-button type="primary" @click="$export('xxx', {extra: 'data'}, $event)">导出【防重复点击】</control-button>
</component-wrap>

::: code
```
<el-button type="primary" @click="$export('xxx', {extra: 'data'})">导出</el-button>
<control-button type="primary" @click="$export('xxx', {extra: 'data'}, $event)">导出</control-button>
```
:::

<table-wrap-methods :list="exportMethods" />


## $postExport
##### 同$export，请求为post


## $exportByEmail
##### 用于业务中列表页导出excel且导出过程耗时，需要导出到邮箱的场景，该请求为get请求，同$export,唯一区别在于该请求成功后回调不需要打开excel下载链接，而是直接提示导出邮箱成功。

## $postExportByEmail
##### 同$exportByEmail，请求为post


## $scrollToView
##### 用于业务中需要将指定元素滚动到可是界面的场景；使用该方法需确保滚动父元素，默认为#body-main,如果工程中滚动容器已经为#body-main则可以忽略

<component-wrap>
<el-button type="primary" @click="$scrollToView('button-audit', 200, bodyMain)">滚动到审核按钮</el-button>
</component-wrap>

::: code
```
<el-button type="primary" @click="$scrollToView('button-audit', 200, bodyMain)">滚动到审核按钮</el-button>
<!-- 该工程滚动容器为documentElement，所以需要传递第三个参数 -->
const bodyMain = document.documentElement;
```
:::

<table-wrap-methods :list="scrollMethods" />


## $baiduGcApi
##### 百度地址解析api

<component-wrap>
<div>
    <el-input placeholder="请输入地址" v-model="address" class="f-input-inline-xxl" />
    <el-button type="primary" @click="$baiduGcApi(address, addressCallback)">百度地址解析</el-button>
    <p>{{baiduAddress}}</p>
</div>
</component-wrap>

::: code
```
<div>
    <el-input placeholder="请输入地址" v-model="address" class="f-input-inline-xxl" />
    <el-button type="primary" @click="$baiduGcApi(address, addressCallback)">百度地址解析</el-button>
    <p>{{baiduAddress}}</p>
</div>
function addressCallback(res) {
    this.baiduAddress = JSON.stringify(res);
}
```
:::
<table-wrap-methods :list="baiduMethods" />

<script>
    export default {
        data() {
            return {
                auditMethods: [
                    {name: '$audit', desc: '审核通过或驳回', params: 'options：{type, callback}'}
                ],
                exportMethods: [
                    {name: '$export', desc: '列表页导出excel, 该方法将下载excel到本地', params: 'url: 后端接口地址；params: 请求参数；$event: 使用control-button时需要提供，可用于组件防止按钮重复提交'}
                ],
                scrollMethods: [
                    {name: '$scroll', desc: '滚动到指定元素', params: 'el: 滚动的目标元素，可传递id或dom元素；top: 目标元素距离顶部的距离，一般工程头部占据56px,所以默认值为56px；scrollBody: 滚动容器，工程中一般默认为#body-main,如若不是，需指定'}
                ],
                baiduMethods: [
                    {name: '$baiduGcApi', desc: '百度地址解析api', params: 'address: 地址字符串；callback: 解析后回调'}
                ],
                bodyMain: '',
                address: '浙江省杭州市滨江区',
                baiduAddress: ''
            }
        },
        mounted() {
            this.bodyMain = document.documentElement;
        },
        methods: {
            addressCallback(res) {
                this.baiduAddress = JSON.stringify(res);
            }
        }
    }
</script>


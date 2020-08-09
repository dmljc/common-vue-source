## renderHeader
##### 用于业务中表格中表头需要鼠标悬浮提示的场景；设置el-table中render-header属性

<component-wrap>
<div>
    <el-table :data="[{name: '张三', sex: '男', age: 18}]">
        <el-table-column label="姓名" prop="name" :render-header="Util.renderHeader('this is tip', 'el-icon-info')" />
        <el-table-column label="性别" prop="sex" :render-header="Util.renderHeader('this is tip', 'el-icon-info', true)" />
        <el-table-column label="年龄" prop="age" :render-header="Util.renderHeader('this is tip')" />
    </el-table>
</div>
</component-wrap>

::: code
```
<el-table :data="[{name: '张三', sex: '男', age: 18}]">
    <el-table-column label="姓名" prop="name" :render-header="Util.renderHeader('this is tip', 'el-icon-info')" />
    <el-table-column label="性别" prop="sex" :render-header="Util.renderHeader('this is tip', 'el-icon-info', true)" />
    <el-table-column label="年龄" prop="age" :render-header="Util.renderHeader('this is tip')" />
</el-table>
```
:::

<table-wrap-attrs title="参数说明" :list="renderHeaderAttrs" />


## prefixInteger
##### 用于公共方法createBelongMonth内部调用，亦可以被外部调用；用于将数字补齐到指定位数，比如用于月份中补齐到两位，1 => 01, 2 => 02, 11 => 11

<component-wrap>
<div>
    <el-input v-model="prefixNumber" class="f-input-inline" />
    <el-button type="primary" @click="fixedNumber = Util.prefixInteger(prefixNumber, 2)">补齐到两位</el-button>
    <span>Result: {{fixedNumber || '-'}}</span>
</div>
</component-wrap>

::: code
```
Util.prefixInteger(prefixNumber, 2);
```
:::

<table-wrap-attrs title="参数说明" :list="prefixAttrs" />


## createBelongMonth
##### 用于业务中查询年月份，该函数自动生成年月份的数据源。

<component-wrap>
<div>
    <el-cascader v-model="belongMonth" :options="belongMonthSource" :props="{value: 'id', label: 'name'}" />
    <span>Selected: {{belongMonth || '-'}}</span>
</div>
</component-wrap>

::: code
```
belongMonthSource = Util.createBelongMonth(2015, true);
```
:::

<table-wrap-attrs title="参数说明" :list="belongMonthAttrs" />


## getNameById
##### 通过id获取下拉数据源中对应的name，提供给过滤器lsSelectionNames内部调用，也可以外部调用，用于详情页中后端未返回文本字段，前端可以通过过滤器将id映射为name

<component-wrap>
<div>
    <el-select v-model="yearValue" class="f-select-inline">
         <el-option
            v-for="item in belongMonthSource"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
    </el-select>
    <span class="f-mr20">Selected Id: {{yearValue || '-'}}</span>
    <span>Selected Name: {{Util.getNameById(yearValue, belongMonthSource) || '-'}}</span>
</div>
</component-wrap>

::: code
```
Util.getNameById(yearValue, belongMonthSource)
```
:::

<table-wrap-attrs title="参数说明" :list="selectionAttrs" />

## download
##### 用于业务中需要下载图片或文件的场景，该函数内部处理了参数拼接以及下载的逐级兼容和退化逻辑，尽可能保证下载的行为；

<component-wrap>
<el-button type="primary" @click="Util.download('https://haitao.nos.netease.com/5b9c52f0-91b2-4205-96ad-7fbb45a01bb0_752_676.png')">下载图片</el-button>
</component-wrap>

::: code
```
<el-button type="primary" @click="Util.download('https://haitao.nos.netease.com/5b9c52f0-91b2-4205-96ad-7fbb45a01bb0_752_676.png')">下载图片</el-button>
```
:::

<table-wrap-attrs title="参数说明" :list="downloadAttrs" />


## datetimeFormat
##### 用于业务中将时间戳格式化为时间格式的场景

<component-wrap>
<span>
    1572867968451 = {{ Util.datetimeFormat(1572867968451) }}
</span>
</component-wrap>

::: code
``` 
<span>
    1572867968451 = {{ Util.datetimeFormat(1572867968451) }}
</span>
```
:::

<table-wrap-attrs title="参数说明" :list="dateTimeAttrs" />

## numberFormat
##### 用于格式化数字，小数点后默认保留 2 位小数

<component-wrap>
<span>
    Util.numberFormat(0.1) = {{ Util.numberFormat(0.1) }}
</span>
</component-wrap>

::: code
```
<span>
    Util.numberFormat(0.1) = {{ Util.numberFormat(0.1) }}
</span>
```
:::

<table-wrap-attrs title="参数说明" :list="numberFormatAttrs" />

## str2arr
##### 用于将类数组形式的字符串分割为数组

<component-wrap>
<span>
    Util.str2arr('1,2,3') = {{ Util.str2arr('1,2,3')}}<br />
    Util.str2arr('1-2-3', '-') = {{ Util.str2arr('1-2-3', '-')}}<br />
    Util.str2arr('1-2-3', '-', true) = {{ Util.str2arr('1-2-3', '-', true)}}
</span>
</component-wrap>

::: code
``` html
<span>
    Util.str2arr('1,2,3') = {{ Util.str2arr('1,2,3')}}<br />
    Util.str2arr('1-2-3', '-') = {{ Util.str2arr('1-2-3', '-')}}<br />
    Util.str2arr('1-2-3', '-', true) = {{ Util.str2arr('1-2-3', '-', true)}}
</span>
```
:::

<table-wrap-attrs title="参数说明" :list="str2arrAttrs" />

## filterEmpty
##### 用于过滤对象中 value 为 undefined, '', null 等无效值；如果想要保留对象中的空字符，可以在对象上增加一个属性_allowSpace为true。

<component-wrap>
<span>
    {{ Util.filterEmpty(filterObj)}}
</span>
</component-wrap>

::: code
``` html
<!-- filterObj: {
    a: 1,
    b: '',
    c: null,
    d: undefined,
    e: 0,
    f: false,
    g: true,
    h: NaN
} -->
{{ Util.filterEmpty(filterObj)}}
```
:::

<table-wrap-attrs title="参数说明" :list="filterEmptyAttrs" />

<script>
    import Util from '@/widget/util';
    export default {
        data() {
            const belongMonthSource = Util.createBelongMonth(2015, true);
            return {
                Util,
                renderHeaderAttrs: [
                    {name: 'content', desc: '鼠标悬浮提示的文字', type: 'String', optional: 'Any String', default: ''},
                    {name: 'icon', desc: '图标，不指定则没有图标', type: 'String', optional: 'element icon图标或项目iconfont', default: ''},
                    {name: 'required', desc: '是否带必填*标志', type: 'Boolean', optional: 'Boolean', default: 'false'}
                ],
                prefixNumber: 1,
                fixedNumber: '',
                prefixAttrs: [
                    {name: 'num', desc: '被格式化的数字', type: 'Number', optional: 'Number', default: ''},
                    {name: 'length', desc: '格式化后的长度', type: 'Number', optional: 'Any Number', default: '2'}
                ],
                belongMonth: [],
                belongMonthSource,
                belongMonthAttrs: [
                    {name: 'start', desc: '数据源的开始年份', type: 'Number', optional: 'year Number', default: '2014'},
                    {name: 'prefixMonth', desc: '是够对选中的值进行月份补全,取决于后端期望的数据格式', type: 'Boolean', optional: 'Boolean', default: 'false'}
                ],
                yearValue: '',
                selectionAttrs: [
                    {name: 'id', desc: '数据id', type: 'Number | String', optional: 'Number | String', default: ''},
                    {name: 'source', desc: '数据源', type: 'Array', optional: 'Array', default: '[]'},
                ],
                downloadAttrs: [
                    {name: 'url', desc: '下载链接', type: 'String', optional: 'url String', default: ''},
                    {name: 'params', desc: '下载额外的参数', type: 'Object', optional: 'Object', default: ''},
                    {name: 'isImage', desc: '是否图片，该字段会影响下载逻辑；如果非图片，下载行为会直接通过window.open进行下载；', type: 'Boolean', optional: 'Boolean', default: 'true'}
                ],
                dateTimeAttrs: [
                    {name: 'timestamp', desc: '被格式化的时间戳', type: 'Number', optional: 'Number', default: ''},
                    {name: 'format', desc: '格式化后的时间格式', type: 'String', optional: 'String', default: 'YYYY-MM-DD HH:mm:ss'}
                ],
                numberFormatAttrs: [
                    {name: 'value', desc: '被格式化的数字', type: 'Number', optional: 'Number', default: ''},
                    {name: 'keep', desc: '保留的小数点位数', type: 'Number', optional: 'Number', default: '2'}
                ],
                str2arrAttrs: [
                    {name: 'str', desc: '被转化的字符串', type: 'String', optional: 'String', default: ''},
                    {name: 'split', desc: '字符串连接符', type: 'String', optional: 'String', default: ','},
                    {name: 'parse', desc: '分割为数组后是否对值进行parseInt转换为Number', type: 'Boolean', optional: 'Boolean', default: 'false'}
                ],
                filterEmptyAttrs: [
                    {name: 'filterObj', desc: '被转化的对象', type: 'Object', optional: 'Object', default: ''}
                ],
                filterObj: {
                    a: 1,
                    b: '',
                    c: null,
                    d: undefined,
                    e: 0,
                    f: false,
                    g: true,
                    h: NaN
                }
            }
        }
    }
</script>
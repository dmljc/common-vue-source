## date
##### 用于格式化日期，默认YYYY-MM-DD

<component-wrap>
<div>
    <el-date-picker v-model="now" />
    <p>
        默认：{{ now | date }}
    </p>
</div>
</component-wrap>

::: code
```
<span>{{ now | date }}</span>
```
:::

## datetime
##### 用于格式化日期时间，默认YYYY-MM-DD HH:mm:ss

<component-wrap>
<div>
    <el-date-picker v-model="now" />
    <p>
        默认：{{ now | datetime }}
    </p>
</div>
</component-wrap>

::: code
```
<span>{{ now | datetime }}</span>
```
:::

## number
##### 用于格式化数字格式化，默认保留小数点后2位

<component-wrap>
<div>
    <el-input v-model="input" placeholder="请输入数字" />
    <p>
        默认：{{ input | number }}
    </p>
    <p>
        整数：{{ input | number(0) }}
    </p>
    <p>
        保留四位小数：{{ input | number(4) }}
    </p>
</div>
</component-wrap>

::: code
```
默认：{{ input | number }}
整数：{{ input | number(0) }}
保留四位小数：{{ input | number(4) }}
```
:::






## lsTraySizeStr
##### 用于物流业务中需要将托盘尺寸固定的数据结构在详情页中呈现的场景

<component-wrap>
<span>
    {{traySizeList | lsTraySizeStr}}
</span>
</component-wrap>

:::code
```
<!-- traySizeList: [{length, width, height, count}, ...] -->
<span>{{traySizeList | lsTraySizeStr}}</span>
```
:::

## lsContainerTypeStr
##### 用于物流业务中需要将柜型固定的数据结构在详情页中呈现的场景

<component-wrap>
<span>
    {{containerTypeList | lsContainerTypeStr}}
</span>
</component-wrap>

:::code
```
<!-- containerTypeList: [{value, name}, ...] -->
<span>{{containerTypeList | lsContainerTypeStr}}</span>
```
:::

## lsSelectionNames
##### 用于业务中需要将多选下拉框的id映射为name在详情中展示的场景

<component-wrap>
<span>
    ids: '1,2', names: {{'1,2' | lsSelectionNames(source)}}
    <br />
    idList: [3, 4], names: {{[3, 4] | lsSelectionNames(source)}}
</span>
</component-wrap>

::: code
```
<!-- source: [{id, name}, ...] -->
<span>
    ids: '1,2', names: {{'1,2' | lsSelectionNames(source)}}
    <br />
    idList: [3, 4], names: {{[3, 4] | lsSelectionNames(source)}}
</span>
```
:::

## lsSecondStr
##### 用于业务中需要将秒数呈现为时分秒的场景

<component-wrap>
<span>
    {{3600 | lsSecondStr}}
</span>
</component-wrap>

::: code
```
<span>
    {{3600 | lsSecondStr}}
</span>
```
:::

## lsCascaderNames
##### 用于业务中需要把级联的id映射为name在详情中展示的场景

<component-wrap>
<span>
    idList: [1, 2, 3], names: {{[1, 2, 3] | lsCascaderNames(cascaderSource)}}
</span>
</component-wrap>

::: code
```
<span>
    idList: [1, 2, 3], names: {{[1, 2, 3] | lsCascaderNames(cascaderSource)}}
</span>
```
:::

<script>
export default {
    data() {
        return {
            now: +new Date(),
            input: '',
            traySizeList: [
                {length: 1, width: 2, height: 3, count: 4}, 
                {length: 99, width: 99, height: 99, count: 99}
            ],
            containerTypeList: [
                {value: 1, name: '20GP'},
                {value: 2, name: '40GP'},
                {value: 3, name: '20RF'},
                {value: 4, name: '40RF'},
                {value: 5, name: '40HC'},
                {value: 6, name: '45HC'}
            ],
            source: [
                {id: 1, name: '中国'},
                {id: 2, name: '美国'},
                {id: 3, name: '巴西'},
                {id: 4, name: '英国'}
            ],
            cascaderSource: [
                {   
                    "id": 1,
                    "name":"中国",
                    "children":[
                        {
                            "id": 2,
                            "name":"浙江",
                             "children":[
                                {
                                    "children": null,
                                    "id": 3,
                                    "name": "杭州"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}
</script>
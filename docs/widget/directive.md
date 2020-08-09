<!-- ## btnTrack
##### 用于Hubble按钮埋点

<component-wrap>
<el-button v-btnTrack type="primary">按钮埋点</el-button>
</component-wrap>

::: code
```
<el-button v-btnTrack type="primary">按钮埋点</el-button>
```
::: -->

## v-int
##### 仅允许输入数字

<component-wrap>
<div>
    <el-input v-model="input1" placeholder="请输入整数" v-int />
    <p>输入值：{{ input1 }}</p>
</div>
</component-wrap>

::: code
```
<el-input v-model="input1" placeholder="请输入整数" v-int />
```
::: 

## v-float
##### 仅允许输入小数，v-float:num 可指定num位小数

<component-wrap>
<div>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-input v-model="input2" placeholder="请输入数字，最多两位小数" v-float />
            <p>默认最多两位小数，输入值：{{ input2 }}</p>
        </el-col>
        <el-col :span="12">
            <el-input v-model="input3" placeholder="请输入数字，最多四位小数" v-float:4 />
            <p>最多四位小数，输入值：{{ input3 }}</p>
        </el-col>
    </el-row>
</div>
</component-wrap>

::: code
```
<el-input v-model="input2" placeholder="请输入数字，最多两位小数" v-float />

<el-input v-model="input3" placeholder="请输入数字，最多四位小数" v-float:4 />
```
:::

## v-intArr
##### 仅允许输入数字，且可输入多个，逗号、空格分隔，可结合Util.blankToComma使用

<component-wrap>
<div>
    <el-input v-model="input4" placeholder="请输入整数" v-intArr />
    <p>使用 Util.blankToComma：{{ formatInput }}</p>
</div>
</component-wrap>

::: code
```
<el-input v-model="input4" placeholder="请输入整数" v-intArr />
```
::: 

## v-numberChar
##### 仅允许输入数字和字母

<component-wrap>
<div>
    <el-input v-model="input5" placeholder="请输入整数或数字" v-numberChar />
    <p>输入值：{{ input5 }}</p>
</div>
</component-wrap>

::: code
```
<el-input v-model="input5" placeholder="请输入整数或数字" v-numberChar />
```
::: 

<script>
import Util from '@/widget/util';
export default {
    data() {
        return {
            Util,
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: ''
        }
    },
    computed: {
        formatInput() {
            return Util.blankToComma(this.input4);
        }
    },
}
</script>
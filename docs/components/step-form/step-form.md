### StepForm

<component-wrap title="基本用法" describition="用于业务中分步骤表单提交的场景">
<step-form-base />
</component-wrap>

::: code
<<< docs/components/step-form/base.vue
:::

<table-wrap-attrs :list="attrs" />
<table-wrap-attrs title="step配置说明" :list="stepAttrs" />
<table-wrap-events :list="events" />

<script>
export default {
    data() {
        return {
            attrs: [
                {name: 'value', desc: '步骤当前节点，通过v-model使用', type: 'String|Number', optional: 'String|Number', default: '1'},
                {name: 'steps', desc: '步骤描述结构，由多个step结构组成，step结构详见下面的step说明', type: 'Array', optional: '[step, ...]', default: '[]'},
                {name: 'width', desc: '步骤宽度', type: 'String', optional: 'width String', default: '70%'},
                {name: 'saveBtn', desc: '是够提供保存按钮，当配置为String时，作为按钮文本生效', type: 'String | Boolean', optional: 'String | Boolean', default: 'true'},
                {name: 'submitBtn', desc: '是够提供提交按钮，当配置为String时，作为按钮文本生效', type: 'String | Boolean', optional: 'String | Boolean', default: 'false'}
            ],
            stepAttrs: [
                {name: 'title', desc: '步骤节点的文本', type: 'String', optional: 'Any String', default: ''},
                {name: 'name', desc: '步骤节点的key值，相当于id', type: 'String|Number', optional: 'String|Number', default: ''},
                {name: 'description', desc: '步骤节点的描述说明', type: 'String', optional: 'Any String', default: ''},
                {name: 'justify', desc: '当前步骤下表单flex布局下的水平排列方式', type: 'String', optional: 'start/end/center/space-around/space-between', default: 'center'},
                {name: 'span', desc: '当前步骤下表单所占的栅格', type: 'Number', optional: '1-24', default: '12'},
                {name: 'beforePre', desc: '若定义该钩子则在点击上一步时触发，支持异步函数【会阻塞】，返回true则进入上一步，否则阻断流程', type: 'Function', optional: 'Function', default: 'null'},
                {name: 'beforeNext', desc: '若定义该钩子则在点击下一步时触发，支持异步函数【会阻塞】，返回true则进入下一步，否则阻断流程', type: 'Function', optional: 'Function', default: 'null'},
                {name: 'beforeEnter', desc: '若定义该钩子则在进入上一步或下一步时触发，不会阻断流程', type: 'Function', optional: 'Function', default: 'null'}
            ],
            events: [
                {name: 'save', desc: '步骤表单保存时触发', params: ''},
                {name: 'submit', desc: '步骤表单提交时触发', params: ''}
            ]
        }
    }
}
</script>
<template>
    <!-- 二次封装el-date-picker组件是为了解决：时间戳数据为0时， 页面渲染为1970年和必填校验失败的问题-->
    <el-date-picker 
        v-bind="$props" 
        v-model="dateValue" 
        @change="onChange($event)">
    </el-date-picker>
</template>

<script>
export default {
    name: 'kl-date-picker',
    props: {
        value: {
            type: Number,
            default: null
        },
        type: {
            type: String,
            default: 'date'
        },
        size: {
            type: String,
            default: 'small'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        defaultValue: {
            type: Date,
            default: null
        },
        pickerOptions: {
            type: Object,
            default: () => ({})
        },
        valueFormat: {
            type: String,
            default: 'timestamp'
        },
        clearable: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: '请选择'
        }
    },
    data() {
        return {
            dateValue: null
        };
    },
    watch: {
        value: {
            immediate: true,
            handler(val) {
                if (val === 0) {
                    this.dateValue = null;
                    this.$emit('input', this.dateValue);
                    return;
                }
                this.dateValue = val;
            }
        }
    },
    methods: {
        onChange(val) {
            this.$emit('input', val);
        }
    }
};
</script>


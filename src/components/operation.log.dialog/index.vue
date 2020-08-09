<template>
    <el-dialog
        :visible="visible"
        :close-on-click-modal="false"
        class="operation-log-dialog-block"
        title="操作日志"
        width="880px"
        append-to-body
        @close="close"
    >
        <operation-log v-bind="$props" />
    </el-dialog>
</template>

<script>
import OperationLog from '../operation.log';
export default {
    name: "OperationLogDialog",
    components: {OperationLog},
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        //oneline: 一条日志一行展示 | multiline: 一条日志多行展示
        format: {
            type: String,
            default: "oneline"
        },
        list: {
            type: Array,
            default: () => []
        },
        timestamp: {
            type: Boolean,
            default: false
        },
        model: {
            type: Object,
            default: () => ({
                author: "author",
                date: "date",
                content: "content",
                remark: "remark"
            })
        }
    },
    methods: {
        close() {
            this.$emit("close");
            // 父组件直接直接通过visible.sync进行双向绑定
            this.$emit("update:visible", false);
        }
    }
};
</script>

<style scoped lang="scss">
/* 引入bem mixin */
@import "~@/assets/style/mixins/index.scss";
</style>

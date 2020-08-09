<template>
    <el-dialog
        :title="title"
        :visible="visible"
        :close-on-click-modal="false"
        class="export-file-block"
        width="680px"
        append-to-body
        @open="resetComponent"
        @close="close"
    >
        <div v-if="type==='confirm'">
            <p class="export-confirm__item">您确认要导出当前查询条件下的所有数据吗？</p>
            <p class="export-confirm__item">确认导出后，数据将以邮件的形式发送到您的工作邮箱</p>
        </div>

        <div v-if="type==='rangeCheck'">
            <p>请选择导出范围</p>
            <el-radio-group v-model="range" class="export-range">
                <el-radio :label="1">当前筛选条件下所有数据</el-radio>
                <el-radio :label="2">当前页选中数据</el-radio>
            </el-radio-group>
        </div>

        <div slot="footer" class="f-tac">
            <el-button v-btnTrack @click="close">取消</el-button>
            <el-button v-btnTrack type="primary" @click="exportFile">确认导出</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "ExportFile",
    props: {
        title: {
            type: String,
            default: "导出"
        },
        //confirm: 二次提示 | rangeCheck: 导出范围选择
        type: {
            type: String,
            default: "confirm"
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            range: 1
        };
    },
    methods: {
        resetComponent() {
            /* eslint-disbale */
        },
        close() {
            this.$emit("close");
            // 父组件直接直接通过visible.sync进行双向绑定
            this.$emit("update:visible", false);
        },
        async exportFile() {
            this.$emit("export", {
                range: this.range
            });
            this.close();
        }
    }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/mixins/index.scss";

@include b(export-confirm) {
    @include e(item) {
        margin-bottom: 20px;
    }
}
@include b(export-range) {
    margin-top: 20px;
}
</style>

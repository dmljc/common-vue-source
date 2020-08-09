<template>
    <div class="header">
        <el-card>
            <div class="header-title">
                <el-row>
                    <el-col :span="subHeader ? 8 : 16">
                        <span>{{header}}</span>
                    </el-col>
                    <el-col v-if="subHeader" :span="8">
                        <span>{{subHeader}}</span>
                    </el-col>
                    <el-col :span="8" align="right" class="header__opts">
                        <slot name="operation"/>
                    </el-col>
                    <el-col v-if="status" :span="24">
                        <span class="header__status f-mt10">{{status}}</span>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "DetailHeader",
    data() {
        return {};
    },
    props: {
        header: {
            type: String,
            default: ""
        },
        subHeader: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: ""
        }
    }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/mixins/index.scss";

@include b(header) {
    position: sticky;
    top: 0;
    z-index: 1001;

    & /deep/ .el-card__body {
        padding-top: 10px;
        padding-bottom: 10px; // 产品觉得占的空间太大了
    }

    @include e(opts) {
        height: 22px;
    }

    @include e(status) {
        display: inline-block;
        height: 25px;
        padding: 0px 16px;
        border: 1px solid #00C4C0;
        border-radius: 27px;
        font-size: 12px;
        line-height: 25px;
        font-weight: 400;
        color: #00C4C0;
    }
}
@include b(header-title) {
    font-size: 16px;
    font-weight: 700;
    color: #333333;
}
</style>


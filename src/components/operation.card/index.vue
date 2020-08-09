<template>
    <el-card class="card" :class="{collapse: !active}">
        <template slot="header">
            <span class="card__header" :title="header">{{header}}</span>
            <span class="card__subHeader">{{subHeader}}</span>
            <div class="card-operation">
                <slot name="operation">
                </slot>
                <el-button v-btnTrack v-if="collapse" type="text" class="card-operation__collapse" @click="active = !active">
                    {{active ? '收起' : '展开'}}
                    <i v-if="active" class="el-icon-arrow-up"></i>
                    <i v-else class="el-icon-arrow-down"></i>
                </el-button>
            </div>
        </template>
        <slot v-if="active" />
    </el-card>
</template>

<script>
export default {
    name: 'OperationCard',
    data() {
        return {
            active: true
        };
    },
    props: {
        header: String,
        subHeader: String,
        collapse: Boolean
    }
};
</script>

<style scoped lang="scss">
/* 引入bem mixin */
@import "~@/assets/style/mixins/index.scss";

@include b(card) {
    @include e(header) {
        max-width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
    }
    @include e(subHeader) {
        margin-left: 20px;
        color: #999;
        font-size: 12px;
    }

    & /deep/ .el-card__header {
        position: relative;
        display: flex;
        align-items: center;
    }

    &.collapse /deep/ .el-card__body {
        padding: 0;
    }
}
@include b(card-operation) {
    position: absolute;
    right: 20px;

    & /deep/ .el-button--text {
        padding: 0;
        font-size: 14px;
        font-weight: 700;
    }

    @include e(collapse) {
        font-size: 14px;
        font-weight: 700;

        & .el-icon-arrow-up, & .el-icon-arrow-down {
            font-size: 14px;
            font-weight: 700;
        }
    }
}
</style>


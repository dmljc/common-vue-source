<template>
    <div class="operation-log-block">
        <div v-if="format==='oneline'" class="log-ctn">
            <el-row v-for="(item, index) in list" :key="index" class="log-row log-row--oneline">
                <el-col :span="4">
                    <span class="log__author log-font--grey">{{ item[model.author] }}</span>
                </el-col>
                <el-col :span="14">
                    <span :title="item.content">{{ item[model.content] }}</span>
                    <span v-if="item.remark" :title="item.remark" class="log__remark log-font--grey">备注：{{ item[model.remark] }}</span>
                </el-col>
                <el-col :span="6" align="right">
                    <span v-if="timestamp" class="log-font--grey">{{item[model.date] | formatTime}}</span>
                    <span v-else class="log-font--grey">{{item[model.date]}}</span>
                </el-col>
            </el-row>
        </div>
        <div v-else class="log-ctn">
            <el-row v-for="(item, index) in list" :key="index" class="log-row">
                <el-col :span="12">
                    <span class="log__author log-font--grey">{{ item[model.author] }}</span>
                </el-col>
                <el-col :span="12" align="right">
                    <span v-if="timestamp" class="log-font--grey">{{ item[model.date] | formatTime }}</span>
                    <span v-else class="log-font--grey">{{ item[model.date] }}</span>
                </el-col>
                <el-col :span="24">
                    <span class="log__content">{{ item[model.content] }}</span>
                </el-col>
                <el-col v-if="item.remark" :span="24">
                    <span :title="item.remark" class="log__remark log-font--grey">备注：{{ item[model.remark] }}</span>
                </el-col>
            </el-row>
        </div>
        <div v-if="!list || !list.length">暂无日志</div>
    </div>
</template>

<script>
export default {
    name: "OperationLog",
    props: {
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
    }
};
</script>

<style scoped lang="scss">
/* 引入bem mixin */
@import "~@/assets/style/mixins/index.scss";

@include b(log-ctn) {
    max-height: 400px;
    overflow: auto;
}
@include b(log-row) {
    padding-bottom: 5px;
    border-bottom: 1px dotted #c0c4cc;
    font-size: 12px;

    @include m(oneline) {
        padding: 8px 0;
    }
    .el-col {
        line-height: 24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
@include b(log-font) {
    @include m(grey) {
        color: #c0c4cc;
    }
}
@include b(log) {
    @include e(author) {
        &::before {
            content: "";
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            border-radius: 10px;
            background: #c0c4cc;
        }
    }
    @include e(remark) {
        margin-left: 20px;
    }
    @include e(content) {
        margin-left: 20px;
    }
}
</style>

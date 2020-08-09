<template>
    <div class="router-info-block">
        <el-table
            :data="list"
            :cell-class-name="setCellClassName"
            max-height="500"
            empty-text="暂无信息"
            class="router-table"
            row-class-name="router-table__row"
            header-cell-class-name="router-table__header-cell"
        >
            <el-table-column key="router-step" v-if="columns.length" width="40" fixed='left'>
                <template>
                    <div class="router-table-step">
                        <span class="router-table-step__line router-table-step__line--up"/>
                        
                        <span class="router-table-step__line router-table-step__line--down"/>
                    </div>
                    <span class="router-table-step__radio"/>
                </template>
            </el-table-column>
            <el-table-column v-for="(column, index) in columns" :key="index" v-bind="column">
                <template slot-scope="scope">
                    <table-column-template :scope="scope" :column="column"/>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import TableColumnTemplate from "./table.column";
export default {
    name: "RouterInfo",
    components: { TableColumnTemplate },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {};
    },
    methods: {
        setCellClassName({ row, rowIndex, columnIndex }) {
            const unreached = `${row.__unreached ? "router-table__cell--unreached" : ""}`;
            const step = `${columnIndex === 0 ? "router-table-step-ctn" : ""}`;
            const stepFirst = `${rowIndex === 0 ? "router-table-step-ctn--first" : ""}`;
            const stepLast = `${rowIndex === this.list.length - 1 ? "router-table-step-ctn--last" : ""}`;
            const turn = `${
                !row.__unreached && this.list[rowIndex + 1] && this.list[rowIndex + 1].__unreached ? "router-table-step-ctn--turn" : ""
            }`;
            return `router-table__cell ${unreached} ${step} ${stepFirst} ${stepLast} ${turn}`;
        }
    }
};
</script>

<style scoped lang="scss">
/* 引入bem mixin */
@import "~@/assets/style/mixins/index.scss";

@include b(router-table-step) {
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include e(line) {
        display: inline-block;
        width: 3px;
        height: 50%;
        background: #55c1bf;

        @include m(up) {
            margin-bottom: 9px;
        }
        @include m(down) {
            margin-top: 9px;
        }
    }
    @include e(radio) {
        display: inline-block;
        width: 7px;
        height: 7px;
        background: #55c1bf;
        border-radius: 7px;
        box-shadow: 0 0 2px 1px #55c1bf;
    }
}

@include b(router-info-block) {
    & /deep/ .el-table__header {
        border: 0;
    }
    & /deep/ .router-table__header-cell.is-leaf {
        border: 0;
        background-color: inherit;
    }
    & /deep/ .router-table__header-cell.is-leaf .cell {
        color: #999;
        font-size: 12px;
        font-weight: 400;
    }
    & /deep/ .router-table__cell {
        padding: 7px 0 8px;
        border: 0;
        color: #333;
        font-size: 12px;
        font-weight: 400;

        & .cell {
            line-height: initial;
        }
    }
    & /deep/ .router-table__cell--unreached {
        color: #999;
    }

    & /deep/ .router-table__cell--unreached .router-table-step__line {
        background: #999;
    }
    & /deep/ .router-table__cell--unreached .router-table-step__radio {
        background: #999;
        box-shadow: 0 0 2px 1px #999;
    }
    & /deep/ .router-table-step-ctn--first .router-table-step__line--up {
        background: transparent;
    }
    & /deep/ .router-table-step-ctn--turn .router-table-step__line--down {
        background: #999;
    }
    & /deep/ .router-table-step-ctn--last .router-table-step__line--down {
        background: transparent;
    }
}
</style>

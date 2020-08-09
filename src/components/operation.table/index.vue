<template>
    <div class="table">
        <el-dropdown class="table-setting-dropdown f-cb" v-if="tableName" trigger="click" :hide-on-click="false">
            <div class="table-setting-icons">
                <i v-if="tableName" class="icon icon-setup"></i>
                <i v-if="!isAll" class="icon-circle"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
                <div class="table-setting">
                    <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        @change="handleCheckAllChange"
                        class="table-setting-checkgroup__checkbox"
                    >全选</el-checkbox>
                    <el-checkbox-group
                        v-model="selected"
                        @change="handleCheckedChange"
                        class="table-setting-checkgroup"
                    >
                        <el-checkbox
                            v-for="(item, index) in settingSource"
                            :key="index"
                            :label="item.id"
                            class="table-setting-checkgroup__checkbox"
                        >
                            <span class="table-setting-checkgroup__checkbox--font-style">{{item.name}}</span>
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-dropdown-menu>
        </el-dropdown>

        <el-table 
            stripe 
            :data="data" 
            :max-height="maxHeight" 
            :empty-text="emptyText" 
            class="kl-table"
            @selection-change="handleSelectionChange"
            @sort-change="handleSortChange">
            <template v-for="(column, index) in columns">
                <!-- 多选的时候显示 -->
                <el-table-column v-if="column.type === 'selection'" :type="column.type" :key="index" />
                <template v-else>
                    <!-- 操作列|勾选框列|fixed列固定展示 -->
                    <el-table-column
                        v-if="column.label === '操作' || column.type || column.fixed || selected.indexOf(column.prop) !== -1"
                        :key="index"
                        v-bind="column"
                    >
                        <template slot-scope="scope">
                            <table-column-template :scope="scope" :column="column" />
                        </template>
                    </el-table-column>
                </template>
            </template>
        </el-table>

        <el-pagination
            v-if="pageSize"
            :current-page="pageNo"
            :page-sizes="[10, 20, 30, 40, 50, 80, 100]"
            :page-size="pageSize"
            :total="total"
            background
            class="f-cb f-mt10 f-mb20 f-fr"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
import TableColumnTemplate from './table.column';
export default {
    name: 'OperationTable',
    components: { TableColumnTemplate },
    props: {
        tableName: String,
        columns: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        emptyText: {
            type: String,
            default: '搜索结果为空，请重新输入搜索内容'
        },
        maxHeight: {
            type: Number,
            default: 500
        },
        pageNo: Number,
        pageSize: Number,
        total: Number
    },
    data() {
        return {
            selected: [],
            isIndeterminate: false,
            checkAll: false
        };
    },
    computed: {
        // 根据表格所有列信息自动过滤出可定制的列
        settingSource() {
            return this.columns
                .filter(
                    column =>
                        // 操作列|勾选框列|fixed列不做定制
                        column.label !== '操作' && !column.type && !column.fixed
                )
                .map(column => ({
                    id: column.prop,
                    name: column.label
                }));
        },
        // 是否当前无定制
        isAll() {
            return this.selected.length === this.settingSource.length;
        }
    },
    watch: {
        // 选中变化自动存储到localstorage
        selected(value) {
            window.localStorage.setItem(this.tableName, JSON.stringify(value));
        }
    },
    mounted() {
        if (!this.tableName) {
            console.warn('component prop `table-name` is undefined');
            this.selected = this.settingSource.map(item => item.id);
            return;
        }
        this.initSelected();
    },
    methods: {
        initSelected() {
            let selected = JSON.parse(window.localStorage.getItem(this.tableName));
            if (!selected) {
                // 默认全部选中，并且初始化localstorage
                selected = this.settingSource.map(item => item.id);
            }
            // 初始化全选和半选状态
            this.checkAll = selected.length === this.settingSource.length;
            this.isIndeterminate = selected.length > 0 && selected.length < this.settingSource.length;
            this.selected = selected;
        },
        handleCheckAllChange(val) {
            const all = this.settingSource.map(item => item.id);
            this.selected = val ? all : [];
            this.isIndeterminate = false;
        },
        handleCheckedChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.settingSource.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.settingSource.length;
        },
        handleSizeChange(pageSize) {
            this.$emit('size-change', pageSize);
        },
        handleCurrentChange(pageNo) {
            this.$emit('current-change', pageNo);
        },
        handleSelectionChange(e) {
            this.$emit('select-change', e);
        },
        handleSortChange(e) {
            this.$emit('sort-change', e);
        }
    }
};
</script>

<style scoped lang="scss">
/* 引入bem mixin */
@import '~@/assets/style/mixins/index.scss';

@include b(table) {
    position: relative;
}
@include b(table-setting-dropdown) {
    position: absolute;
    right: 20px;
    top: -20px;
}

@include b(table-setting-icons) {
    position: relative;
}
@include b(icon-setup) {
    cursor: pointer;
    font-size: 20px;
    color: #00c4c0;
}
@include b(icon-circle) {
    position: absolute;
    top: 2px;
    right: -1px;
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    color: red;
    background: red;
}

@include b(table-setting) {
    width: 320px;
    max-height: 600px;
    overflow: auto;
    padding: 0 10px;
    
    & /deep/ .el-checkbox+.el-checkbox {
        margin-left: 0px;
    }
}

@include b(table-setting-checkgroup) {
    @include e(checkbox) {
        width: 150px;
        margin: 0;
        padding: 4px 8px;
        @include m(font-style) {
            display: inline-block;
            max-width: 120px;
            vertical-align: middle;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
<template>
    <div class="left-tree-block">
        <el-container>
            <el-aside :width="width">
                <el-row type="flex">
                    <slot name="aliasFilter" />
                    <el-input v-model="filterText" size="small" class="aside__search" :placeholder="placeholder" @input="filter()">
                        <template slot="prepend">
                            <i class="el-icon-search"/>
                        </template>
                    </el-input>
                </el-row>
                <div class="aside-container">
                    <ul class="aside-ul">
                        <li
                            v-for="(item, index) in list"
                            v-show="item._display"
                            :key="index"
                            :id="item[valueKey]"
                            :name="item[nameKey]"
                            :class="['aside-item', {'aside-item--active': value == item[valueKey]}]"
                            @click="onItemClick(item)"
                        >
                            <span class="aside-item__name">{{ item[nameKey] }}</span>
                        </li>
                    </ul>
                </div>
            </el-aside>

            <el-main width="75%" class="main-container">
                <h3 v-if="!value">{{emptyText}}</h3>
                <el-card v-if="value">
                    <div slot="header">
                        <span>{{ currentName }}</span>
                    </div>
                    <slot></slot>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "LeftTree",
    data() {
        return {
            list: [],
            filterText: "",
            currentName: ""
        };
    },
    props: {
        width: {
            type: String,
            default: '229px'
        },
	    nameKey: {
            type: String,
            default: 'name'
        },
        valueKey: {
            type: String,
            default: 'id'
        },
        source: {
            type: Array,
            default: () => []
        },
        value: [Number, String],
        placeholder: {
            type: String,
            default: '模糊搜索'
        },
        emptyText: {
            type: String,
            default: '未选择条目'
        },
        init: { // 初始自动赋值第一项
            type: Boolean,
            default: false
        }
    },
    watch: {
        source: {
            immediate: true,
            deep: true,
            handler(value) {
                this.list = JSON.parse(JSON.stringify(value));
                if (this.init && this.list.length) {
                    this.currentName = this.list[0][this.nameKey];
                    this.$emit('input', this.list[0][this.valueKey]);
                }
                this.filter();
            }
        }
    },
    methods: {
        filter() {
            this.list.forEach((item) => {
                const text = this.filterText;
                this.$set(item, '_display', true);
                if (text && item.name.indexOf(text) === -1) {
                    this.$set(item, '_display', false);
                }
            });
        },
        onItemClick(item) {
            const id = item[this.valueKey],
                name = item[this.nameKey];
            if (this.value == id) {
                return;
            } 
            this.currentName = name;
            this.$emit('input', id);
            this.$emit('change', item);
        }
    }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/mixins/index.scss";

@include b(left-tree-block) {
    padding: 15px 16px;
    background: #fff;
}
@include b(aside) {
    @include e(search) {
        margin-bottom: 20px;

        & /deep/ .el-input-group__prepend {
            position: absolute;
            top: 1px;
            bottom: 1px;
            left: 1px;
            background: transparent;
            border: 0;
            display: flex;
            align-items: center;
            text-align: center;
            margin: 0;
            padding: 10px;
        }

        & /deep/ .el-input__inner {
            padding-left: 32px;
        }
    }
}
@include b(aside-container) {
    height: 600px;
    border: 1px solid #ccc;
    overflow: auto;
}
@include b(aside-ul) {
    list-style: none;
    padding: 0;
    margin: 0;
}
@include b(aside-item) {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    line-height: 28px;

    @include m(active) {
        color: #fff;
        background: #00c4c0;
    }
}
@include b(main-container) {
    padding: 0 20px;
}
</style>

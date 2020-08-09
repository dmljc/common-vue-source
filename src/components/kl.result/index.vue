<template>
    <div class="result">
        <div v-if="type == 'success'" class="result__icon">
            <i class="el-icon-circle-check"/>
        </div>
        <div v-else class="result__icon">
            <i class="el-icon-circle-close"/>
        </div>
        <div class="result__title">{{ title }}</div>
        <div :class="{'result__description': $slots.description}">
            <slot name="description"/>
        </div>
        <div :class="{'result__extra': $slots.extra}">
            <slot name="extra"/>
        </div>
        <div :class="{'result__actions': $slots.actions}">
            <slot name="actions"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "KlResult",
    props: {
        title: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "success"
        }
    }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/mixins/index.scss";

@include b(result) {
    text-align: center;
    width: 72%;
    margin: 0 auto;

    @include e(icon) {
        font-size: 72px;
        line-height: 72px;
        margin-bottom: 24px;
        .el-icon-circle-close {
            color: #f48080;
        }
        .el-icon-circle-check {
            color: #93dd68;
        }
    }

    @include e(title) {
        margin-bottom: 16px;
        font-size: 32px;
        color: rgba(51, 51, 51, 0.85);
        font-weight: 500;
        line-height: 32px;
    }

    @include e(description) {
        font-size: 12px;
        color: rgba(102, 102, 102, 0.85);
        text-align: center;
        line-height: 24px;
        margin-bottom: 16px;
    }

    @include e(extra) {
        background: #fafafa;
        padding: 24px 40px;
        border-radius: 2px;
        text-align: left;
    }

    @include e(actions) {
        margin-top: 32px;

        button:not(:last-child) {
            margin-right: 8px;
        }
    }
}
</style>

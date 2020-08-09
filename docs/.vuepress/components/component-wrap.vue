<template>
    <div class="wrap">
        <h3 class="wrap-title">{{title || '示例'}}</h3>
        <h4 v-if="describition" class="wrap-describition">{{describition}}</h4>
        <div class="wrap-content">
            <div class="wrap-component">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        describition: String
    }
}
</script>

<style scoped>
    .wrap {
        width: 100%;
        font-size: 14px;
        color: #5e6d82;
        line-height: 1.5em;
    }
    .wrap-title {
        margin: 55px 0 20px;
        font-weight: 400;
        color: #1f2f3d;
        font-size: 22px;
    }
    .wrap-describition {
        margin: 16px 0;
        font-weight: 400;
        color: #5e6d82;
        font-size: 14px;
    }
    .wrap-content {
        border: 1px solid #ededed;
        transition: .2s;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    .wrap-component {
        padding: 20px;
    }
</style>
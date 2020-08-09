<template>
    <el-button v-btnTrack
        :loading="loading"
        v-bind="$props"
        @click="handleClick"
    >
        <slot/>
    </el-button>
</template>
<script>
export default {
    name: 'ControlButton',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        size: String,
        icon: {
            type: String,
            default: ''
        },
        nativeType: {
            type: String,
            default: 'button'
        },
        disabled: Boolean,
        plain: Boolean,
        autofocus: Boolean,
    },
    data() {
        return {
            loading: false
        };
    },
    methods: {
        handleClick(evt) {
            this.loading = true;
            evt.resolve = () => {
                this.loading = false;
            };
            this.$emit('click', evt);
        }
    }
};
</script>

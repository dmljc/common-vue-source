<template>
    <control-button type="primary" @click="onClick">防重复提交</control-button>
</template>

<script>
export default {
    methods: {
        onClick(e) {
            window.setTimeout(() => {
                e.resolve();
            }, 2000);
        }
    }
}
</script>
<template>
    <div>
        <span>{{0 | lsSecondStr}}</span>
        <span>{{-1 | lsSecondStr}}</span>
        <span>{{60 | lsSecondStr}}</span>
        <span>{{3600 | lsSecondStr}}</span>
        <span>{{86399 | lsSecondStr}}</span>
        <span>{{86400 | lsSecondStr}}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
};
</script>
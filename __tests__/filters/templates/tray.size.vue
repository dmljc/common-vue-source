<template>
    <div>
        <span>{{traySizeList1 | lsTraySizeStr}}</span>
        <span>{{traySizeList2 | lsTraySizeStr}}</span>
        <span>{{traySizeList3 | lsTraySizeStr}}</span>
        <span>{{traySizeList4 | lsTraySizeStr}}</span>
        <span>{{traySizeList5 | lsTraySizeStr}}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            traySizeList1: undefined,
            traySizeList2: null,
            traySizeList3: [],
            traySizeList4: [{
                length: 0,
                width: 0,
                height: 0,
                count: 0
            }],
            traySizeList5: [{
                length: 0,
                width: 0,
                height: 0,
                count: 0
            }, {
                length: 99,
                width: 99,
                height: 99,
                count: 99
            }]
        };
    },
};
</script>
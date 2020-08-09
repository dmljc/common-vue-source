<template>
    <div>
        <span>{{containerTypeList1 | lsContainerTypeStr}}</span>
        <span>{{containerTypeList2 | lsContainerTypeStr}}</span>
        <span>{{containerTypeList3 | lsContainerTypeStr}}</span>
        <span>{{containerTypeList4 | lsContainerTypeStr}}</span>
        <span>{{containerTypeList5 | lsContainerTypeStr}}</span>
        <span>{{containerTypeList6 | lsContainerTypeStr}}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            containerTypeList1: undefined,
            containerTypeList2: null,
            containerTypeList3: [],
            containerTypeList4: [
                {value: 1, name: '20GP'},
                {value: 2, name: '40GP'},
                {value: 3, name: '20RF'},
                {value: 4, name: '40RF'},
                {value: 5, name: '40HC'},
                {value: 6, name: '45HC'}
            ],
            containerTypeList5: [
                {value: 1, name: '20GP'},
                {value: 2, name: '40GP'},
                {value: 3, name: '20RF'},
            ],
            containerTypeList6: [
                {value: 1, name: '20GP'},
                {value: 0, name: '40GP'},
                {value: '', name: '20RF'}
            ]
        };
    },
};
</script>
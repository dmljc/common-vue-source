<template>
    <operation-table :columns="columns" :data="list" @select-change="onSelectChange" @sort-change="onSortChange"></operation-table>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                { type: 'selection' },
                { label: '节点', prop: 'route', minWidth: 200, sortable: true },
                { label: '操作时间', prop: 'time', minWidth: 200 }
            ],
            list: [
                { route: '转入地审批', time: '2018-08-8 12:26:22' },
                { route: '转入出地审批', time: '2018-08-9 12:26:22' },
                { route: '转入地报关', time: '2018-08-10 12:26:22' }
            ]
        };
    },
    methods: {
        onSelectChange(e) {
            // your code
        },
        onSortChange(e) {
            this.list.reverse();
        }
    }
};
</script>
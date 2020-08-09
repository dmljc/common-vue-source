<template>
    <operation-table
        :columns="columns"
        :data="list"
        :page-size="3"
        :page-no="1"
        :total="100"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
    ></operation-table>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                { label: '节点', prop: 'route', minWidth: 200 },
                { label: '操作时间', prop: 'time', minWidth: 200 }
            ],
            list: [
                { route: '转入地审批', time: '2018-08-11 12:26:22' },
                { route: '转入地审批', time: '2018-08-11 12:26:22' },
                { route: '转入地报关', time: '2018-08-11 12:26:22' }
            ]
        };
    },
    methods: {
        onSizeChange(pageSize) {},
        onCurrentChange(pageNo) {}
    }
};
</script>
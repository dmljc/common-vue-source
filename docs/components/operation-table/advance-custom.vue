<template>
    <operation-table :columns="columns" :data="list" table-name="MODULEA-PAGEB-TABLEC"></operation-table>
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
    }
};
</script>
<template>
    <div>
    <el-table :data="list">
        <el-table-column prop="name" label="姓名" :render-header="renderHeader" />
    </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [{ name: '张三' }],
            renderHeader: () => {}
        };
    },
};
</script>
<template>
<div>
    <h3 class="wrap-title">{{title || 'Slots'}}</h3>
    <el-table :data="list" :stripe="true">
        <el-table-column prop="name" label="name" align="left" />
        <el-table-column prop="desc" label="说明" align="left" />
    </el-table>
</div>
</template>

<script>
export default {
    props: {
        title: String,
        list: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style scoped>
    .wrap-title {
        margin: 55px 0 20px;
        font-weight: 400;
        color: #1f2f3d;
        font-size: 22px;
    }
</style>
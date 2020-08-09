<template>
    <div>
        <el-button type="primary" @click="visible=true">导出</el-button>
        <export-file
            :visible.sync="visible"
            title="导出前选择范围"
            type="rangeCheck"
            @export="$exportByEmail('xxx', {data: 1})"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false
        }
    }
}
</script>
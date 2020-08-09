<template>
    <div>
        <el-button type="primary" @click="visible=true">导出</el-button>
        <export-file
            :visible.sync="visible"
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
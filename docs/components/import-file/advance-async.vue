<template>
    <div>
        <el-button type="primary" @click="visible=true">导入</el-button>
        <import-file
            templateUrl="xxx"
            importUrl="xxx"
            :downloadAsync="true"
            :visible.sync="visible"
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
<template>
    <div>
        <el-button type="primary" @click="visible=true">导入</el-button>
        <import-file
            templateUrl="xxx"
            importUrl="xxx"
            :extraData="extraData"
            :visible.sync="visible"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            extraData: {
                no: '201910301111'
            }
        }
    }
}
</script>
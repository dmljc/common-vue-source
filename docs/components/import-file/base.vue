<template>
    <div>
        <el-button type="primary" @click="visible=true">导入</el-button>
        <!-- ！！！工程内不要使用自搭的nos上传接口，使用后端的上传接口 -->
        <import-file
            templateUrl="https://haitao.nos.netease.com/366f150f-2dd9-439e-b676-4d7e3e3f69d1.xlsx"
            importUrl="https://nos.kaolafed.com/upload"
            :visible.sync="visible"
            :onLoadInterceptor="this.onLoadInterceptor"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false
        }
    },
    methods: {
        onLoadInterceptor(res) {
            return {
                code: res.status,
                result: {},
                message: res.statusText
            };
        },
    }
}
</script>
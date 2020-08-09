<template>
    <!-- 该组件供命令式调用，挂载在Vue.$audit上，不要进行组件注册。 -->
    <el-dialog :title="title" class="audit" :visible="visible" width="500px" @open="open" @close="close" :close-on-click-modal="false">
        <el-form ref="form" :rules="rules" :model="params">
            <el-form-item v-if="type==='reject'" label="驳回理由" prop="remark">
                <el-input v-model="params.remark" type="textarea" placeholder="请输入"></el-input>
            </el-form-item>
            <p v-else>{{message}}</p>
        </el-form>
        <div slot="footer">
            <el-button v-btnTrack @click="close">{{cancelButtonText}}</el-button>
            <el-button v-btnTrack type="primary" @click="ok">{{okButtonText}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            title: "审核",
            type: "pass",
            message: "",
            params: {},
            cancelButtonText: "",
            okButtonText: "",
            rules: {
                remark: [{ required: true, message: "请输入" }]
            },
            visible: false
        };
    },
    methods: {
        open() {
            this.$refs.form && this.$refs.form.resetFields();
        },
        close() {
            this.visible = false;
        },
        async ok() {
            try {
                await this.$refs.form.validate();
                this.callback && this.callback.call(null, {remark: this.params.remark});
                this.visible = false;
            } catch (e) {
                console.error(e);
            }
        }
    }
};
</script>


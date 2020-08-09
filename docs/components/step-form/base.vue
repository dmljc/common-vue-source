<template>
    <step-form :steps="steps" v-model="currentStep" @save="onStepSave">
        <template slot="first">
            <el-row>
                <el-col :span="12">
                    <span>用户名： 买了佛冷</span>
                </el-col>
            </el-row>
        </template>
        <template slot="second">
            <el-row>
                <el-col :span="24">
                    <span>用户名： why</span>
                </el-col>
            </el-row>
        </template>
    </step-form>
</template>

<script>
export default {
    data() {
        return {
            steps: [
                { title: '第一步', name: 'first', description: '信息描述' },
                { title: '第二步', name: 'second', description: '信息描述' }
            ],
            currentStep: 'first'
        };
    },
    methods: {
        onStepSave() {
            this.$message.success('保存成功');
        }
    }
};
</script>
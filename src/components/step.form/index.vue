<template>
    <div class="step-form">
        <el-steps :active="currentStep" :style="{width: width}" class="step-form__steps">
            <el-step v-for="(step, index) in steps" :key="index" :title="step.title">
                <span slot="description" class="step-form__description">{{step.description}}</span>
            </el-step>
        </el-steps>
        <div class="step-form-wrapper">
            <template v-for="(step, index) in steps">
                <el-row :key="index" type="flex" :justify="step.justify || 'center'">
                    <el-col :span="step.span || 12" v-if="currentStep === index+1">
                        <slot :name="step.name"></slot>
                    </el-col>
                </el-row>
            </template>
        </div>
        <div class="step-form-buttons">
            <el-button v-btnTrack @click="preStep" v-if="currentStep > 1">上一步</el-button>
            <div class="step-form-buttons--right">
                <el-button
                    v-btnTrack
                    v-if="currentStep===steps.length && saveBtn"
                    type="primary"
                    @click="handleSave"
                >{{saveBtnText}}</el-button>
                <el-button
                    v-btnTrack
                    v-if="currentStep===steps.length && submitBtn"
                    type="primary"
                    @click="handleSubmit"
                >{{submitBtnText}}</el-button>
                <el-button v-btnTrack type="primary" @click="nextStep" v-if="currentStep < steps.length">下一步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StepForm',
    props: {
        value: {
            type: [String, Number],
            default: 1
        },
        steps: {
            type: Array,
            default: () => []
        },
        width: {
            type: String,
            default: '70%'
        },
        saveBtn: {
            type: [String, Boolean],
            default: true
        },
        submitBtn: {
            type: [String, Boolean],
            default: false
        }
    },
    data() {
        return {};
    },
    computed: {
        currentStep() {
            const index = this.steps.findIndex(step => step.name === this.value);
            return index + 1;
        },
        saveBtnText() {
            if (!this.saveBtn) {
                return '';
            }
            return typeof this.saveBtn === 'boolean' ? '保存' : this.saveBtn;
        },
        submitBtnText() {
            if (!this.submitBtn) {
                return '';
            }
            return typeof this.submitBtn === 'boolean' ? '提交' : this.submitBtn;
        }
    },
    methods: {
        handleSave() {
            //currentStep-1对应数组steps下标
            const value = this.steps[this.currentStep - 1].name;
            this.$emit('save', value);
        },
        handleSubmit() {
            //currentStep-1对应数组steps下标
            const value = this.steps[this.currentStep - 1].name;
            this.$emit('submit', value);
        },
        async preStep() {
            //currentStep-1对应数组steps下标，-2代表上一步
            const step = this.steps[this.currentStep - 1];
            if (step.beforePre && typeof step.beforePre === 'function') {
                const success = await step.beforePre();
                if (!success) {
                    return false;
                }
            }
            const value = this.steps[this.currentStep - 2].name;
            this.$emit('input', value);
            const newStep = this.steps[this.currentStep - 2];
            if (newStep.beforeEnter && typeof newStep.beforeEnter === 'function') {
                newStep.beforeEnter();
            }
        },
        async nextStep() {
            //currentStep-1对应数组steps下标
            try {
                const step = this.steps[this.currentStep - 1];
                if (step.beforeNext && typeof step.beforeNext === 'function') {
                    const success = await step.beforeNext();
                    if (!success) {
                        return false;
                    }
                }
                //currentStep-1对应数组steps下标，-1后+1代表下一步
                const value = this.steps[this.currentStep].name;
                this.$emit('input', value);
                const newStep = this.steps[this.currentStep];
                if (newStep.beforeEnter && typeof newStep.beforeEnter === 'function') {
                    newStep.beforeEnter();
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
};
</script>

<style scoped lang="scss">
/* 引入bem mixin */
@import '~@/assets/style/mixins/index.scss';

@include b(step-form) {
    @include e(title) {
        position: relative;
        margin: 0;
        padding: 0 0 0 12px;
        font-size: 15px;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 4px;
            height: 16px;
            margin-top: -8px;
            background: #3fc4c0;
        }
    }
    @include e(steps) {
        margin: auto;
    }
    @include e(description) {
        /* stylelint-disable */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        /* stylelint-enable */
    }
}

@include b(step-form-wrapper) {
    margin-top: 48px;
}

@include b(step-form-buttons) {
    position: relative;
    height: 32px;
    margin-top: 20px;

    @include m(right) {
        position: absolute;
        top: 0;
        right: 0;
    }
}
</style>

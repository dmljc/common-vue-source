<template>
    <el-dialog
        :title="title"
        :visible="visible"
        :close-on-click-modal="false"
        class="import-file-block"
        :class="{'import-file-block--flex': status!=='init'}"
        width="550px"
        append-to-body
        @open="resetComponent"
        @close="close"
    >
        <div v-if="status==='init'">
            <div class="import-init">
                <span>选择要导入的文件：</span>
                <el-button v-btnTrack v-if="!hasFile" type="primary" size="small" @click="selectFile">选择文件</el-button>
                <a v-if="templateUrl && !hasFile" @click="downloadTemplate" href="javascript:;" class="import-init__download" target="_blank">模板文件下载</a>
                <el-tag
                    v-for="(file, index) in files"
                    :key="index"
                    closable
                    type="info"
                    class="import-file__tag"
                    :title="file.name"
                    @close="onRemoveFile(index)"
                >{{ file.name }}</el-tag>
                <input
                    v-show="false"
                    ref="inputNode"
                    :multiple="false"
                    :accept="accept"
                    type="file"
                    name="file"
                    @change="onFileSelectChange"
                >
            </div>
            <div class="import-tip">
                <h5>注意事项：</h5>
                <p class="import-tip__item">1. 请按照导出文件的格式进行导入，系统数据以本次导入的为准，历史数据的会被覆盖掉；</p>
                <p class="import-tip__item">2. 单次导入的数据最多5000行，如果数据量大，请分批导入；</p>
                <p class="import-tip__item">3. 文件大小不能超过2M。</p>
            </div>
        </div>

        <div class="import-uploading" v-if="status === 'uploading'">
            <el-progress class="uploading-bar" :text-inside="true" :stroke-width="14" :percentage="uploadingPercent" status="success"/>
            <p class="import-status__tip">正在读取数据... {{ uploadingPercent }}%</p>
        </div>

        <div v-if="status === 'success'" class="import-result">
            <i class="icon icon-chenggong"></i>
            <div>
                <span>{{ resultMessage || '导入成功' }}</span>
                <div class="import-result-opts">
                    <a href="javascript:;" @click="resetComponent">继续导入</a>
                </div>
            </div>
        </div>
        <div v-if="status === 'fail'" class="import-result">
            <i class="icon icon-error"></i>
            <div>
                <span>{{ resultMessage || '导入失败，请检查文档内容，修改后重新导入' }}</span>
                <div class="import-result-opts">
                    <a v-if="resultUrl" :href="resultUrl">下载报错文档</a>
                    <a href="javascript:;" @click="resetComponent">重新导入</a>
                </div>
            </div>
        </div>
        <div slot="footer">
            <el-button v-btnTrack v-if="status === 'init'" @click="close">取消</el-button>
            <el-button v-btnTrack v-if="status === 'init'" :disabled="!files.length" type="primary" @click="importFile">开始导入</el-button>
            <el-button v-btnTrack v-if="status === 'success' || status === 'fail'" type="primary" @click="close">完成</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {JSONAPI} from '@/widget/request';
import axios from "axios";

export default {
    name: "ImportFile",
    props: {
        title: {
            type: String,
            default: "导入"
        },
        accept: {
            type: String,
            default: ".xlsx,.xls"
        },
        extraData: {
            type: Object,
            default: () => ({})
        },
        templateUrl: {
            type: String,
            default: ""
        },
        importUrl: {
            type: String,
            default: ""
        },
        visible: {
            type: Boolean,
            default: false
        },
        onLoadInterceptor: {
            type: Function,
            default: res => res
        },
        downloadAsync: {
            type: Boolean,
            default: false
        },
        onSuccessCb: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            status: "init",
            uploadingPercent: 0,
            uploadingInterval: "",
            resultMessage: "",
            resultUrl: "",
            files: []
        };
    },
    computed: {
        hasFile() {
            return this.files && this.files.length;
        }
    },
    methods: {
        resetComponent() {
            this.status = "init";
            this.resultMessage = "";
            this.resultUrl = "";
            this.uploadingPercent = 0;
            this.uploadingInterval = "";
            this.files = [];
        },
        close() {
            this.$emit("close");
            // 父组件直接直接通过visible.sync进行双向绑定
            this.$emit("update:visible", false);
        },
        async downloadTemplate() {
            if(this.downloadAsync) {
                const response = await JSONAPI.get(this.templateUrl);
                const result = response.data || response.result || {};
                const url = result.data || result.resultUrl || result.url || '';
                url && window.open(url, '_self');
            } else {
                window.open(this.templateUrl, '_self');
            }
        },
        selectFile() {
            const inputNode = this.$refs.inputNode;
            inputNode.click();
        },
        onFileSelectChange(e) {
            const files = e.currentTarget.files;
            this.files.push(...files);
            this.$refs.inputNode.value = "";
        },
        onRemoveFile(index) {
            this.files.splice(index, 1);
        },
        importFile() {
            if (!this.files.length) {
                this.$message.error("请选择文件");
                return;
            }
            const formData = this.createFormData();
            const FormAPI = axios.create({
                timeout: 50000,
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Content-Type": "multipart/form-data"
                }
            });
            FormAPI.interceptors.response.use(this.successInterceptor, this.errorInterceptor);
            this.status = "uploading";
            this.uploadingInterval = window.setInterval(() => {
                this.uploadingPercent++;
                if(this.uploadingPercent === 100) {
                    this.resetTimer();
                }
            }, (60 * 1000) / 100);
            FormAPI.post(this.importUrl, formData);
        },
        createFormData() {
            const formData = new FormData();
            for (let index = 0; index < this.files.length; index++) {
                const file = this.files[index];
                formData.append("file", file);
            }
            for (const [key, value] of Object.entries(this.extraData)) {
                formData.append(key, value);
            }
            return formData;
        },
        successInterceptor(response) {
            this.resetTimer();
            window.setTimeout(() => {
                //留时间给进度条动画走完
                this.onSuccess(response);
            }, 500);
        },
        errorInterceptor(e) {
            this.resetTimer();
            window.setTimeout(() => {
                //留时间给进度条动画走完
                this.onError(e);
            }, 500);
        },
        resetTimer() {
            window.clearInterval(this.uploadingInterval);
            this.uploadingInterval = "";
            this.uploadingPercent = 100;
        },
        async onSuccess(response) {
            //取决于接口的格式
            response = this.onLoadInterceptor(response.data);
            if(this.onSuccessCb) {
                // 用于处理先上传nos，后和后端交互的逻辑，
                // 此处等待和后端异步逻辑处理完成后再决定上传组件真正的成功或失败
                const res = await this.onSuccessCb(response);
                response = typeof res === 'object' ? res : response;
            }
            const data = response.data || response.result || {};
            if (response.code === 200) {
                this.status = "success";
                this.resultMessage = response.message || "导入成功";
            } else {
                this.status = "fail";
                this.resultMessage = response.message || "导入失败，请检查文档内容，修改后重新导入";
                this.resultUrl = data.failedUrl || data.resultUrl || data.url || response.resultUrl;
            }
        },
        onError() {
            this.status = "fail";
            this.resultMessage = "导入失败，请检查文档内容，修改后重新导入";
        }
    }
};
</script>

<style scoped lang="scss">
@import "~@/assets/style/mixins/index.scss";

@include b(icon-chenggong) {
    margin-right: 20px;
    color: #67c23a;
    font-size: 40px;
}
@include b(icon-error) {
    margin-right: 20px;
    color: #f56c6c;
    font-size: 40px;
}

@include b(import-file-block) {
    & /deep/ .el-dialog__body {
        height: 196px;
    }

    @include m(flex) {
        & /deep/ .el-dialog__body {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

@include b(import-file) {
    @include e(tag) {
        position: relative;
        height: 24px;
        line-height: 24px;
        max-width: 280px;
        margin-left: 8px;
        padding: 0 28px 0 8px;
        text-overflow: ellipsis;
        overflow: hidden;
        vertical-align: middle;
        border-radius: 3px;
        background: #f2f2f2;
        color: #868686;
        font-size: 12px;
        font-weight: 400;

        & /deep/ .el-icon-close {
            position: absolute;
            right: 5px;
            top: 4px;
        }
    }
}
@include b(import-init) {
    @include e(download) {
        margin-left: 20px;
        color: #409eff;
        text-decoration: none;
    }
}
@include b(import-tip) {
    margin-top: 40px;

    @include e(item) {
        color: #909399;
        font-size: 12px;
    }
}

@include b(import-uploading) {
    width: 100%;
}
@include b(import-status) {
    @include e(tip) {
        margin-top: 20px;
        color: #909399;
        font-size: 12px;
        text-align: center;
    }
}
@include b(uploading-bar) {
    & /deep/ .el-progress-bar__inner {
        transition: width .5s;
    }
}

@include b(import-result) {
    display: flex;
    justify-content: center;
}
@include b(import-result-message) {
    margin-left: 20px;
}
@include b(import-result-opts) {
    margin-top: 8px;
    a {
        color: #409eff;
        text-decoration: none;
        margin-right: 20px;
    }
}
</style>

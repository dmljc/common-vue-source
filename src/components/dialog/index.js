import Vue from 'vue';

function DialogFn(option) {
    const {
        data: dialogData = {},
        title,
        width = '560px',
        confirm,
        content,
        showFooter = true,
        beforeClose,
        customClass = '',
        closeOnConfirm = true,
        modalClickClose = false
    } = option;

    const el = document.createElement('div');
    document.body.appendChild(el);

    const template = `
        <el-dialog
            :width="width"
            :close-on-click-modal="modalClickClose"
            :custom-class="customClass"
            :title="title"
            :visible.sync="show"
            :before-close="handleClose"
            :append-to-body="true"
            @close="close">
                <dialogContent ref="content" @close="close" @confirm="_confirm" v-model="dialogData"></dialogContent>
                <div v-if="showFooter" slot="footer" class="dialog-footer">
                    <el-button @click="close">取 消</el-button>
                    <el-button type="primary" @click="_confirm(dialogData)">确 定</el-button>
                </div>
        </el-dialog>`;

    return new Vue({
        el,
        template,
        components: { dialogContent: content },
        data() {
            return {
                title,
                show: false,
                width,
                dialogData,
                showFooter,
                customClass,
                modalClickClose
            };
        },
        mounted() {
            this.show = true;
        },
        methods: {
            handleClose(done) {
                beforeClose ? beforeClose(done) : done();
            },
            close() {
                this.show && this._destroy();
            },
            async _confirm(result) {
                const { validate, confirm: beforeConfirm } = this.$refs.content;
                try {
                    if (validate) {
                        const success = await validate();
                        if (!success) {
                            return;
                        }
                    }
                    beforeConfirm && (await beforeConfirm(this));
                    confirm && confirm(result, this);
                    closeOnConfirm && this._destroy();
                } catch (e) {
                    console.log(e);
                }
            },
            _destroy() {
                this.show = false;
                const { $el } = this;
                const { parentNode: $parent } = $el;
                $parent && setTimeout(() => {
                    $parent.removeChild($el);
                }, 500);
            }
        }
    });
}

export default DialogFn;

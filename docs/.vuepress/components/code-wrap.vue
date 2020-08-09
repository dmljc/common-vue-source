<template>
    <div class="wrap">
        <div class="wrap-code" v-if="visible">
            <slot />
        </div>
        <div class="wrap-code-control" @click="visible = !visible">
            <span v-if="visible"><i class="el-icon-caret-top"></i>&nbsp;隐藏代码</span>
            <span v-else><i class="el-icon-caret-bottom"></i>&nbsp;显示代码</span>
            <span class="f-fr f-mr20" @click="runOnline">在线运行</span>
        </div>
        <form action="https://codepen.io/pen/define" method="POST" target="_blank" style="display:none;">
            <input type="hidden" name="data" :value="codepenJson" />
            <input ref="onlineBtn" type="submit" />
        </form>
    </div>
</template>

<script>
import beautify from 'js-beautify';
export default {
    data() {
        return {
            visible: false,
            codepenJson: ''
        }
    },
    methods: {
        runOnline(e) {
            e.stopPropagation();
            const html = beautify.html(`<div id="app"></div>`, {indext_size: 4});
            const css = beautify.css(`html,body{padding: 20px}`, {indext_size: 4});
            const js = beautify(`var Main = {
                    data() {
                        return {}
                    }
                };
                Vue.use(compose.default);
                var Ctor = Vue.extend(Main)
                new Ctor().$mount('#app')`, {indent_size: 4});
            const data = {
                title: 'logis-compose-web demo',
                description: 'this is logis-compose-web online demo',
                html,
                css,
                js,
                js_external: 'https://unpkg.com/vue@2.6.6/dist/vue.js;https://haitao.nos.netease.com/c79ac5df-be14-4a24-b629-2af53ee2a106.js;',
                css_external: ''
            };
            this.codepenJson = JSON.stringify(data);
            // todo 
            // 需要把源码自动带入到codepen
            this.$nextTick(() => {
                this.$refs.onlineBtn.click();
            });
        }
    }
}
</script>

<style scoped>
    .wrap {
        border: 1px solid #eaeefb;
        border-top: 0;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    .wrap-code-control {
        position: relative;
        height: 44px;
        width: 100%;
        border-top: 1px solid #eaeefb;
        font-size: 16px;
        color: #d3dce6;
        line-height: 44px;
        text-align: center;
        cursor: pointer;
        transition: .3s;
    }
    .wrap-code-control:hover {
        color: #409eff;
    }
</style>
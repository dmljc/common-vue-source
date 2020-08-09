import { JSONAPI } from '@/widget/request';
import Util from '@/widget/util';

// 原型链扩展函数
import Audit from '@/components/audit.dialog';
import Dialog from '@/components/dialog';

// 全局注册组件
import ControlButton from '@/components/control.button';
import DetailHeader from '@/components/detail.header';
import ErrorLayout from '@/components/error.layout';
import ExportFile from '@/components/export.file';
import ImportFile from '@/components/import.file';
import LeftTree from '@/components/left.tree';
import LsTopMenuSearch from '@/components/ls.top.menu.search';
import OperationCard from '@/components/operation.card';
import OperationLog from '@/components/operation.log';
import OperationLogDialog from '@/components/operation.log.dialog';
import OperationTable from '@/components/operation.table';
import RouterInfo from '@/components/router.info';
import StepForm from '@/components/step.form';
import KLDatePicker from '@/components/kl.date.picker';
import KLResult from '@/components/kl.result';

const components = {
    ControlButton,
    DetailHeader,
    ErrorLayout,
    ExportFile,
    ImportFile,
    LeftTree,
    LsTopMenuSearch,
    OperationCard,
    OperationLog,
    OperationLogDialog,
    OperationTable,
    RouterInfo,
    StepForm,
    KLDatePicker,
    KLResult
};

export default {
    install(Vue) {
        Vue.prototype.$audit = Audit;
        Vue.prototype.$dialog = Dialog;
        Vue.prototype.$formatTime = Util.datetimeFormat;
        Vue.prototype.$number = Util.numberFormat;

        // 全局注册复合组件
        // eslint-disable-next-line guard-for-in
        for (let key in components) {
            const component = components[key];
            component.name && Vue.component(component.name, component);
        }

        Vue.prototype.$export = async function(url, params, event) {
            try {
                const response = await JSONAPI.get(url, {params});
                const result = response.data || response.result || {};
                window.open(result.resultUrl || result.url, '_self');
                this.$message.success('导出成功');
                event && event.resolve && event.resolve();
            } catch (e) {
                console.log(e);
                event && event.resolve && event.resolve();
            }
        };
        Vue.prototype.$postExport = async function(url, params, event) {
            try {
                const response = await JSONAPI.post(url, params);
                const result = response.data || response.result || {};
                window.open(result.resultUrl || result.url, '_self');
                this.$message.success('导出成功');
                event && event.resolve && event.resolve();
            } catch (e) {
                console.log(e);
                event && event.resolve && event.resolve();
            }
        };

        Vue.prototype.$exportByEmail = async function(url, params, event) {
            try {
                await JSONAPI.get(url, {params});
                this.$message.success('导出成功，稍后请查看邮箱');
                event && event.resolve && event.resolve();
            } catch (e) {
                console.log(e);
                event && event.resolve && event.resolve();
            }
        };
        Vue.prototype.$postExportByEmail = async function(url, params, event) {
            try {
                await JSONAPI.post(url, params);
                this.$message.success('导出成功，稍后请查看邮箱');
                event && event.resolve && event.resolve();
            } catch (e) {
                console.log(e);
                event && event.resolve && event.resolve();
            }
        };

        Vue.prototype.$scrollToView = function(el, top, scrollBody) {
            try {
                this.$nextTick(() => {
                    // 默认56px为面包屑和标题占的高度
                    scrollBody = scrollBody || 'body-main';
                    top = top === undefined ? 56 : top;
                    el = typeof el === 'string' ? document.getElementById(el) : el;
                    scrollBody = typeof scrollBody === 'string' ? document.getElementById(scrollBody) : scrollBody;
                    const offsetTop = el.offsetTop;
                    scrollBody && scrollBody.scroll && scrollBody.scroll(0, offsetTop - top);
                });
            } catch (e) {
                console.log(e);
            }
        };

        Vue.prototype.$baiduGcApi = function(address, callback) {
            if(typeof address === 'function') {
                callback = address;
                address = '';
            }
            const codeMap = {
                1: 'BAIDU服务器内部错误',
                2: '请求参数非法',
                3: '权限校验失败',
                4: '配额校验失败',
                5: 'ak不存在或者非法',
                101: '服务禁用',
                102: '不通过白名单或者安全码不对'
            };
            const ak = 'T4rCPEKnCXE9rrslhXHs98p0129116iq';
            this.$jsonp('https://api.map.baidu.com/geocoder/v2/', {
                ak,
                address,
                output: 'json'
            }).then((json) => {
                if(json.status === 0) {
                    callback.call(this, json.result);
                    return;
                }
                // vue-jsonp第三方模块实现有问题，以上这些code错误不会resolve进来，也不会捕获到错误
                this.$message.error(`地址解析出错：${codeMap[json.status]}`);
            }).catch((err) => {
                console.error(err);
            });
        };
    }
};
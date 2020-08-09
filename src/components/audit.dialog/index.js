import audit from './audit.dialog';
import Vue from 'vue';

const defaultOptions = {
    title: '提示',
    params: {
        remark: ''
    },
    message: '确认审核通过?',
    cancelButtonText: '取消',
    okButtonText: '确认',  
};
const defaultPassOptions = {
    title: '审核',
    type: 'pass',
    message: '确认审核通过?',
    cancelButtonText: '取消',
    okButtonText: '审核通过',  
};
const defaultRejectOptions = {
    title: '审核',
    type: 'reject',
    message: '确认审核通过?',
    cancelButtonText: '取消',
    okButtonText: '驳回',  
};
const AuditConstructor = Vue.extend(audit);
const getInstance = (function() {
    let instance;
    return function() {
        if(!instance) {
            instance = new AuditConstructor({
                el: document.createElement('div')
            });
            document.body.appendChild(instance.$el);
            return instance;
        }
        return instance;
    };
})();

const showDialg = function(options) {
    const instance = getInstance();
    for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
            instance[prop] = typeof options[prop] === 'object' ? JSON.parse(JSON.stringify(options[prop])) : options[prop];
        }
    }
    instance.visible = true;
};

const Audit = function(options) {
    let props;
    if(options.type === 'pass') {
        props = Object.assign({}, defaultOptions, defaultPassOptions, options);
    } else {
        props = Object.assign({}, defaultOptions, defaultRejectOptions, options);
    }
    showDialg(props);
};
export default Audit;

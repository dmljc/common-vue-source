const btnTrack = {
    inserted(el, binding) {
        el.addEventListener('mousedown', () => {
            let innerText = el.innerText || '未知操作';
            let value = binding.value || binding.expression || innerText;
            if (binding.arg) {
                // @kaola/hubble-tool 中定义的方法
                window.btnTracker && window.btnTracker(value, binding.arg);
            } else {
                window.btnTracker && window.btnTracker(value);
            }
        });
    }
};

const int = {
    update(el, binding, vnode, oldVnode) {
        if (vnode.data.model.value == oldVnode.data.model.value) {
            return;
        }
        if (!vnode.data.model.value && vnode.data.model.value !== 0) {
            //空数据不处理
            return;
        }
        const input = el.getElementsByTagName('input')[0];
        if (input) {
            input.value = vnode.data.model.value;
            input.value = input.value.replace(/[^\d]+/g, '');
            input.dispatchEvent(new Event('input'));
        }
    }
};

const intArr = {
    update(el, binding, vnode, oldVnode) {
        if (vnode.data.model.value == oldVnode.data.model.value) {
            return;
        }
        if (!vnode.data.model.value && vnode.data.model.value !== 0) {
            //空数据不处理
            return;
        }
        const input = el.getElementsByTagName('input')[0];
        if (input) {
            input.value = vnode.data.model.value;
            input.value = input.value.replace(/[^\d，, ]+/g, '');
            input.dispatchEvent(new Event('input'));
        }
    }
};

const float = {
    update(el, binding, vnode, oldVnode) {
        if (vnode.data.model.value == oldVnode.data.model.value) {
            return;
        }
        if (!vnode.data.model.value && vnode.data.model.value !== 0) {
            //空数据不处理
            return;
        }
        const decimal = parseInt(binding.arg) || 2;
        const input = el.getElementsByTagName('input')[0];
        if (input) {
            input.value = vnode.data.model.value;
            let value = input.value;
            //过滤非法字符
            value = value.replace(/[^\d.]+/g, '');
            //过滤多余的点
            value = value.replace('.', '$###$').replace(/\./g, '').replace('$###$', '.');
            //过滤多余的小数位数
            const exp = new RegExp(`([\\d]+\\.[\\d]{${decimal}})([\\d]+)`);
            value = value.replace(exp, (v1, v2) => v2);
            input.value = value;
            input.dispatchEvent(new Event('input'));
        }
    }
};

const numberChar = {
    update(el, binding, vnode, oldVnode) {
        if (vnode.data.model.value == oldVnode.data.model.value) {
            return;
        }
        if (!vnode.data.model.value && vnode.data.model.value !== 0) {
            //空数据不处理
            return;
        }
        const input = el.getElementsByTagName('input')[0];
        if (input) {
            input.value = vnode.data.model.value;
            input.value = input.value.replace(/[^\da-zA-Z]+/g, '');
            input.dispatchEvent(new Event('input'));
        }
    }
};

export default {
    install(Vue) {
        // 物流指令全部以ls开头，防止全局注册冲突
        Vue.directive('btnTrack', btnTrack);
        // 仅允许输入数字的输入框
        Vue.directive('int', int);
        // 仅允许输入浮点数的输入框
        Vue.directive('float', float);
        // 仅允许输入数字，且可输入多个的输入框
        Vue.directive('intArr', intArr);
        // 仅允许输入数字和字母的输入框
        Vue.directive('numberChar', numberChar);
    }
};
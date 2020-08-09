import Element from 'element-ui';
import VueJsonp from 'vue-jsonp';

import 'element-kaola/index.scss';
import '@/assets/style/index.scss';

import Compose from '@/compose';
import Directives from '@/directives';
import Filters from '@/filters';
import Util from '@/widget/util';

export default {
    install(Vue) {
        Vue.config.productionTip = false;

        // 通用组件注册
        Vue.use(Element);
        
        // vue jsonp
        Vue.use(VueJsonp);

        // 复合组件注册
        Vue.use(Compose);

        // 物流指令注册
        Vue.use(Directives);

        // 物流过滤器注册
        Vue.use(Filters);
    }
};

export {
    Util
};
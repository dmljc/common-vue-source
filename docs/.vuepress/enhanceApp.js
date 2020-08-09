import Element from 'element-ui';
import VueJsonp from 'vue-jsonp';

import 'element-kaola/index.scss';
import '@/assets/style/index.scss';

import Compose from '@/compose';
import Directives from '@/directives';
import Filters from '@/filters';
import AutoRegisteComponents from '@root/docs/.vuepress/utils/auto-registe-components';

import VueHighlightJS from 'vue-highlight.js';
import 'vue-highlight.js/lib/allLanguages';
import 'highlight.js/styles/github.css';


export default ({
    Vue, // 当前 VuePress 应用所使用的 Vue 版本
    options, // 根 Vue 实例的选项
    router, // 应用程序的路由实例
    siteData // 网站元数据
}) => {
    Vue.config.productionTip = false
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
    // 代码高亮
    Vue.use(VueHighlightJS);
    // 自动注册文档demo组件
    Vue.use(AutoRegisteComponents);
}
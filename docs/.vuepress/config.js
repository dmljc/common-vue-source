const path = require('path');
const CodeContainerPlugin = require('./plugins/code-container');

module.exports = {
    title: 'Common-Vue',
    description: '物流业务通用包',
    base: '/',
    dest: './public',
    head: [
        ['link', { rel: 'icon', href: 'http://haitao.nos.netease.com/25ab9d19-4fba-4ef7-8907-e8ff22a64fe4.ico' }],
        ['link', { rel: 'stylesheet', type: 'text/css', href: 'http://at.alicdn.com/t/font_393438_s1dtjye4ef.css'}],
        ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge'}]
    ],
    markdown: {
        extendMarkdown: md => {
            md.use(...CodeContainerPlugin);
        }
    },
    themeConfig: {
        logo: 'https://haitao.nos.netease.com/28a7eff0-7769-4e5b-b428-2fd5962d3713_209_189.svg',
        nav: [
            { text: 'Home', link: '/' },
            { text: '指南', link: '/guide' },
            { text: '组件', link: '/components/control-button/control-button' },
            { text: '通用', link: '/widget/util' }
        ],
        sidebar: {
            '/components/': [
                ['control-button/control-button', 'ControlButton'],
                ['detail-header/detail-header', 'DetailHeader'],
                ['export-file/export-file', 'ExportFile'],
                ['import-file/import-file', 'ImportFile'],
                ['kl-date-picker/kl-date-picker', 'KLDatePicker'],
                ['left-tree/left-tree', 'LeftTree'],
                ['operation-card/operation-card', 'OperationCard'],
                ['operation-log/operation-log', 'OperationLog'],
                ['operation-log-dialog/operation-log-dialog', 'OperationLogDialog'],
                ['operation-table/operation-table', 'OperationTable'],
                ['router-info/router-info', 'RouterInfo'],
                ['step-form/step-form', 'StepForm'],
            ],
            '/widget/': [
                ['util', '工具函数'],
                ['prototype', '原型扩展'],
                ['filter', '过滤器'],
                ['directive', '指令封装']
            ]
        },
        lastUpdated: 'Last Updated',
        // repo: 'https://g.hz.netease.com/ccwl/logistics-compose-web',
        // repoLabel: 'GitLab',
        docsDir: 'docs',
        // editLinks: true,
        // editLinkText: '帮助我们改进页面内容！'
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', path.join(process.cwd(), 'src'))
            .set('@root', process.cwd());
    },
}
const path = require('path');

module.exports = {
    // css: { extract: false },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', path.join(__dirname, 'src'));
        config.module.rule('fonts').use('url-loader').loader('url-loader')
            .tap(options => Object.assign(options, { limit: undefined })).end()
        // config.module.rule('js').use('babel-loader').loader('babel-loader')
        //     .tap(options => {return {include: path.join(__dirname, 'node_modules/element-ui-verify')}})
        // config.module.rule('js').include.add(path.join(__dirname, 'node_modules/element-ui-verify/dist/index.js'))
        //     .add(path.join(__dirname, 'src')).end()
    },
    // configureWebpack: {
    //     optimization: {
    //         minimize: false
    //     }
    // },
    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: true
}
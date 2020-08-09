module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: "chrome 40",
                useBuiltIns: "usage",
                modules: false,
                forceAllTransforms: true,
                // 不包含transform-regenerator会导致async/awiat语法只会解析到function*,
                // 低版本webpack引入容易出uglify报错
                // exclude: [
                //     "transform-regenerator"
                // ]
            }
        ],
        "@vue/babel-preset-jsx"
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-json-strings",
        [
            "@babel/plugin-proposal-decorators",
            {
                legacy: true
            }
        ],
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-throw-expressions",
    ],
    env: {
        test: {
            presets: ["@babel/preset-env"]
        }
    }
};

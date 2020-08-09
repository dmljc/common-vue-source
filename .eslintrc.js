// http://eslint.org/docs/user-guide/configuring

module.exports = {
    extends: 'kaola/esnext',
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module' // ECMAScript模块
    },
    globals: {
        // jest global var
        jest: true,
        describe: true,
        it: true,
        test: true,
        expect: true,
        beforeAll: true,
        afterAll: true,
        beforeEach: true,
        afterEach: true
    },
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    rules: {
        quotes: 0,
        'space-before-function-paren': 0
    }
};
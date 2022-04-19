module.exports = {
    env: {
        es6: true,
        node: true,
    },
    plugins: [
        '@typescript-eslint'
    ],
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb-base',
        // 启用typescript的规则
        'plugin:@typescript-eslint/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018, // ES的版本
    },
    settings: {
        "import/resolver": {
            node: { // 限制node端的import
                extensions: [".js", ".ts"]
            },
        }
    },
    rules: {
        // 解决airbnb新版导致的问题
        'import/extensions': [
            'error',
            'ignorePackages',
            {
              'js': 'never',
              'ts': 'never'
            }
        ]
    },
};

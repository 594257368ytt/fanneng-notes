module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'plugin:vue/essential',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: ['vue'],
  rules: {
    'no-console': 0,
    'no-alert': 1, //提示alert
    'no-var': 2, //禁用var，用let和const代替
    'no-constant-condition': 2, //禁止在条件中使用常量表达式 if(true) if(1)
    'no-empty': 1, //块语句中的内容不能为空
    'no-irregular-whitespace': 2, //不能有不规则的空格
    'no-multi-spaces': 1, //不能用多余的空格
    'no-redeclare': 2, //禁止重复声明变量
    indent: [2, 2, { SwitchCase: 0,"MemberExpression": 1 }], // 使用缩进量为2
    semi: [2, 'never'], // 不使用分号
    quotes: [2, 'single'], // 使用单引号
    'space-before-function-paren': 'off',
    'no-console': 'off',
    'import/newline-after-import': 'off',
    'no-param-reassign': 'off',
    'space-before-function-paren': 'off',
    'object-curly-spacing': 'off',
    'block-spacing': 'off',
    'dot-notation': 'off',
    'arrow-parens': 'off',
    'space-before-blocks': 'off',
    'no-confusing-arrow': 'off',
    'arrow-body-style': 'off',
    semi: 'off',
    'spaced-comment': 1, //注释风格要不要有空格什么的
  },
}

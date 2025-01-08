---
date: 2024-12-26 16:44:25
pageClass: blue-archive
tags:
  - ESLint
categories:
  - 前端
---
# ESLint自用规则集合

```js
// @7.1.0
module.exports = {
    // 定义为根级 eslint 配置, 配置为 true 后, 不再向外查找其他的 eslint 规则
    'root': true,
    // 指定脚本的运行环境 每种环境都有一组特定的预定义全局变量
    'env': {
        'browser': true,
        'node': true
    },
    //
    'extends': [
        // eslint 官方推荐的配置 rule 列表
        'eslint:recommended',
        // vue3 官方插件提供的 rule 列表
        'plugin:vue/vue3-essential'
    ],
    'overrides': [],
    // 允许你指定你想要支持的 JavaScript 语言选项
    'parserOptions': {
        // 支持所有的 ECMAScript 规范
        'ecmaVersion': 'latest',
        // 使用 ES6 的模块导入规范
        'sourceType': 'module'
    },
    // 支持使用第三方插件 在使用插件之前, 你必须使用 npm 或者 yarn 安装它
    'plugins': [
        'vue'
    ],
    // ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置 off | warn | error
    'rules': {
        // 语法校验类
        'no-console': 'warn', // 禁用 console
        'no-extra-parens': 'error', // 禁止不必要的括号

        // 最佳实践类
        'array-callback-return': 'error', // 强制数组方法的回调函数中有 return 语句, 如: Array.filter()
        'block-scoped-var': 'error', // 把 var 语句看作是在块级作用域范围之内
        'eqeqeq': 'error', // 要求使用 === 和 !==

        // 代码风格类
        'quotes': ['error', 'single'], // 强制使用一致的反勾号、单引号
        'array-bracket-newline': ['error', 'never'], // 在数组开括号后和闭括号前强制换行
        'array-bracket-spacing': ['error', 'never'], // 数组内部使用一致的空格
        'comma-dangle': ['error', 'never'], // 要求或禁止末尾逗号
        'eol-last': ['error', 'always'], // 要求或禁止文件末尾保留一行空行
        'indent': ['error', 4], // 强制使用指定数量的空格进行缩进
        'spaced-comment': ['error', 'always'], // 要求或禁止在注释前有空白
        'space-infix-ops': ['error', {'int32Hint': false}], // 要求中缀操作符周围有空格
        'space-in-parens': ['error', 'never'], // 禁止圆括号内的空格
        'space-before-function-paren': ['error', 'never'], // 禁止函数圆括号之前有一个空格
        'switch-colon-spacing': ['error', {'after': true, 'before': false}], // 强制在 switch 的冒号左无空格 右边有空格
        'wrap-regex': 'error', // 强制正则表达式加括号
        'arrow-spacing': ['error', {'before': true, 'after': true}], // 要求箭头函数的箭头之前或之后有空格
        'no-var': 'error', // 要求使用 let 或 const 而不是 var
        'prefer-arrow-callback': 'error', // 要求使用箭头函数作为回调
        'prefer-const': 'error', // 未变更过的值强制使用 const 进行定义
    }
}

```

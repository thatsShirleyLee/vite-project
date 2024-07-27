# 硅谷甄选运营平台

## 技术选型

- **Vue3框架**: 使用Vue框架最新版本, 组合式API形式开发项目。
- **Vite**: 构建化工具。
- **TypeScript**: TypeScript技术栈。
- **Vue Router**: 采用Vue-router最新版本管理路由。
- **Pinia**: 采用Pinia集中式管理状态。
- **Element Plus**: UI组件库采用Element Plus。
- **Axios**: 网络交互。
- **ECharts**: 数据可视化大屏。

## 学习的收获

1. 掌握如何规范的开发项目
2. 掌握自己如何封装后台管理系统模板
3. 掌握菜单权限与按钮权限
4. 掌握数据大屏该如何解决
5. 掌握请求响应拦截器该如何二次封装
6. 掌握SVG矢量图如何在项目中使用
7. 掌握主题颜色切换与暗黑模式的切换

# 1. 项目构建

```zsh
(base) shirley@thatsShirleyLeedeMacBook-Pro guigu_zhenxuan % pnpm create vite
.../190efbc67cb-17264                    |   +1 +
.../190efbc67cb-17264                    | Progress: resolved 1, reused 0, downloaded 1, added 1, done
✔ Project name: … vite-project
✔ Select a framework: › Vue
✔ Select a variant: › TypeScript

Scaffolding project in /Users/shirley/Learn/尚硅谷前端技术文档/硅谷甄选/guigu_zhenxuan/vite-project...

Done. Now run:

  cd vite-project
  pnpm install
  pnpm run dev

(base) shirley@thatsShirleyLeedeMacBook-Pro guigu_zhenxuan % cd vite-project
(base) shirley@thatsShirleyLeedeMacBook-Pro vite-project % pnpm install
Packages: +49
+++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 86, reused 0, downloaded 49, added 49, done
node_modules/.pnpm/esbuild@0.21.5/node_modules/esbuild: Running postinstall script, done in 311ms

dependencies:
+ vue 3.4.34

devDependencies:
+ @vitejs/plugin-vue 5.1.0
+ typescript 5.5.4
+ vite 5.3.5
+ vue-tsc 2.0.29

Done in 4.1s
(base) shirley@thatsShirleyLeedeMacBook-Pro vite-project % pnpm run dev

> vite-project@0.0.0 dev /Users/shirley/Learn/尚硅谷前端技术文档/硅谷甄选/guigu_zhenxuan/vite-project
> vite


  VITE v5.3.5  ready in 507 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

# 2. 配置

## 2.1 运行时浏览器自动打开

```json
"dev": "vite --open", // add --open
```

## 2.2 配置`eslint`

### 2.2.1 安装

```zsh
(base) shirley@thatsShirleyLeedeMacBook-Pro vite-project % pnpm i eslint -D
Packages: +88
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 174, reused 49, downloaded 88, added 88, done

devDependencies:
+ eslint 9.7.0

Done in 5s

(base) shirley@thatsShirleyLeedeMacBook-Pro vite-project % npx eslint --init
You can also run this command directly using 'npm init @eslint/config@latest'.

> vite-project@0.0.0 npx
> create-config

@eslint/create-config: v1.2.0

✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · vue
✔ Does your project use TypeScript? · typescript
✔ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint@9.x, globals, @eslint/js, typescript-eslint, eslint-plugin-vue
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · pnpm
☕️Installing...
 WARN  using --force I sure hope you know what you are doing
Packages: +213
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 213, reused 137, downloaded 76, added 213, done

devDependencies:
+ @eslint/js ^9.7.0
+ eslint-plugin-vue 9.27.0
+ globals 15.8.0
+ typescript-eslint 7.17.0

 WARN  Issues with peer dependencies found
.
├─┬ @typescript-eslint/parser 7.17.0
│ └── ✕ unmet peer eslint@^8.56.0: found 9.7.0
└─┬ typescript-eslint 7.17.0
  ├── ✕ unmet peer eslint@^8.56.0: found 9.7.0
  ├─┬ @typescript-eslint/utils 7.17.0
  │ └── ✕ unmet peer eslint@^8.56.0: found 9.7.0
  └─┬ @typescript-eslint/eslint-plugin 7.17.0
    ├── ✕ unmet peer eslint@^8.56.0: found 9.7.0
    └─┬ @typescript-eslint/type-utils 7.17.0
      └── ✕ unmet peer eslint@^8.56.0: found 9.7.0

Done in 15.4s
Successfully created /Users/shirley/Learn/尚硅谷前端技术文档/硅谷甄选/guigu_zhenxuan/vite-project/eslint.config.js file.
Note that some plugins currently do not support ESLint v9 yet.
You may need to use '--force' when installing
```

### 2.2.2 `.eslint.cjs`

```js
// @see https://eslint.bootcss.com/docs/rules/

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  /* 指定如何解析语法 */
  parser: 'vue-eslint-parser',
  /** 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* 继承已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', '@typescript-eslint'],
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/semi': 'off',

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
    'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
    'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
  },
}
```

### 2.2.3 `.eslintignore`

```
dist
node_modules
```

### 2.2.4 `package.json`

```json
 "scripts": {
    "dev": "vite --open",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint src",  // add 检查语法错误
    "fix": "eslint src --fix"  // add 修复语法错误
  },
```

## 2.3 配置prettier

eslint: 语法
prettier: 格式

### 2.3.1 安装

```zsh
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
```

### 2.3.2 `prettierrc.json`添加规则

```json
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```

### 2.3.3 `.prettierignore`

```
/dist/*
/html/*
.local
/node_modules/**
**/*.svg
**/*.sh
/public/*
```

## 2.4 配置stylelint

### 2.4.1 安装

```zsh
pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
```

### 2.4.2 `.stylelintrc.cjs`

```js
// @see https://stylelint.bootcss.com/

module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
    'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
}
```

### 2.4.3 `.stylelintignore`

```
/node_modules/*
/dist/*
/html/*
/public/*
```

### 2.4.4 `package.json`

```json
"scripts": {
    "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
  },
```

- 统一的脚本
  ```json
  "scripts": {
    "dev": "vite --open",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint src",
    "fix": "eslint src --fix",
    "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
    "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
    "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
  },
  ```

# 2.5 配置husky

在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要**【强制让开发人员按照代码规范来提交】**。

> 要做到这件事情，就需要利用husky**【在代码提交之前触发git hook(git在客户端的钩子)】**，然后执行`pnpm run format`来自动的格式化我们的代码。

### 2.5.1 安装husky

```zsh
pnpm install -D husky
```

### 2.5.2 配置husky

```shell
npx husky-init
```

### 2.5.3 配置`.husky/pre-commit`

```zsh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm run format
```

## 2.6 配置commitlint

### 2.6.1 安装

```zsh
pnpm add @commitlint/config-conventional @commitlint/cli -D
```

### 2.6.2 `commitlint.config.cjs`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
```

### `package.json`

```json
"scripts": {
    "commitlint": "commitlint --config commitlint.config.cjs -e -V"
  },
```

#### 填写commit规范

> `type(scope?):subject`
>
> - type: 表示提交的类型，通常是一个单词，用来说明这次提交的目的。
> - scope (可选): 表示影响的范围，可以是一个文件、一个模块、一个功能等。使用小括号 () 括起来。
> - subject: 表示简要描述这次提交的内容。简洁明了，一般不超过50个字符。

#### 常见type类型

- `feat` | 新特性、新功能
- `fix` | 修改bug
- `docs` | 文档修改
- `style` | 代码格式修改, 注意不是 css 修改
- `refactor` | 代码重构
- `perf` | 优化相关，比如提升性能、体验
- `test` | 测试用例修改
- `chore` | 其他修改, 比如改变构建流程、或者增加依赖库、工具等
- `revert` | 回滚到上一个版本
- `build` | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动

### 2.6.3 配置husky

```zsh
npx husky add .husky/commit-msg
```

- 添加内容

```zsh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm commitlint
```
## 2.7 强制使用pnpm包管理器工具
### 2.7.1 创建`scritps/preinstall.js`
```js
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
    ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}
```
### `package.json`
```json
"scripts": {
    "preinstall": "node ./scripts/preinstall.js"
  },
```
> **当我们使用npm或者yarn来安装包的时候，就会报错了。原理就是在install的时候会触发preinstall（npm提供的生命周期钩子）这个文件里面的代码。**
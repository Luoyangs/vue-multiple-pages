### 1.1 配置eslint
```
npm i eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-html -D

```

在项目根目录下添加.eslintrc文件,并配置
```json
{
  "extends": "standard",
  "plugins": [
    "html"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6
  }
}
```

在package.json 里面配置
```json
...

"lint": "eslint --ext .js --ext .vue client/ build/ config/",
// 自动帮我们修复eslint错误
"lint-fix": "eslint --fix --ext .js --ext .vue client/ build/ config/"
```

自动开启eslint实时检测
```
npm i eslint-loader babel-eslint -D

```

配置.eslintrc
```
...
"parser": "babel-eslint"
```

添加rules
```js
{
  test: /\.(js|vue|jsx)$/,
  enforce: 'pre',
  loader: 'eslint-loader',
  exclude: /node_modules/
}
```

### 1.2 git hook安装
```
npm i husky -D
```
> 注意：在使用husky前必须先git初始化

然后在package.json里面配置。husky的hook默认是precommit
```json
"precommit": ”npm run lint-fix"  // 自动帮你修复

"precommit": "npm run lint"  // 只检测不修复，需要手动修复才可以
```

### 1.3 nodemon自动重启服务端
```
npm i nodemon -D
```
在根目录下添加nodemon.json文件
```json
{
  "restartable": "rs",
  "ignore": [ // 忽略重启的文件和文件夹
    ".git",
    "README.md",
    "node_modules/**/node_modules",
    "dist"
  ],
  "verbose": true,
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js json html"  // 监听的文件后缀名
}
```
在package.json里面修改脚本
```json
"dev": "nodemon build/dev-server.js"
```

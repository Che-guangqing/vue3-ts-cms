# vue3-ts-cms

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 项目配置
#### 1、创建并配置 `.editorconfig` 文件, 安装 `EditorConfig for VS Code` 插件
#### 2、使用 `prettier` 工具：安装 `Prettier# Code formatter` 插件 ；安装`npm install prettier -D`
#### 3、配置脚本 ` "prettier": "prettier --write"`, 运行 `npm run prettier`
#### 4、兼容eslit 和 prettier 配置：安装两个插件 `npm install eslint-plugin-prettier eslint-config-prettier -D`
#### 5、git提交之前检查代码是否符合eslint规范 `npx husky-init && npm install`
#### 6、使用Commitizen规范git commit 的提交信息 `npm install commitizen -D` 、安装cz-conventional-changelog，并且初始化cz-conventional-changelog `npx commitizen init cz-conventional-changelog --save-dev --save-exact`  执行`npx cz`
#### 7、通过commitlint来限制提交， `npm i @commitlint/config-conventional @commitlint/cli -D`; 使用husky生成commit-msg文件，验证提交信息`npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"`
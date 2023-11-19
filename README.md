## 脚手架用途

脚手架也常被称为`CLI`，全称`command-line interface`，翻译为命令行界面。前端脚手架CLI，也就是一个**命令行工具**，如`vue-cli`、`create-react-app`

- 创建项目 + 通用代码：规范项目目录结构、埋点、`http` 请求、工具方法、组件库
- git 操作：创建仓库、代码冲突、远程代码同步、创建版本、发布打 `tag`

- 构建 + 发布上线：依赖安装和构建、资源上传 `cdn`、域名绑定、测试/正式服务器

## 脚手架开发内容

分包、命令注册、参数解析、帮助文档、命令行交互、日志打印、命令行文字变色、网络通信、文件处理

## 需求分析

- 命令列表
  - `vue create [options] <app-name>`一样提供一个初始化项目的命令
  - `vue add [options] <plugin> [pluginOptions]`提供一个添加插件一样的操作命令
  - `vue --version`查看版本
  - `vue --help`提供命令列表
- 区分生产环境与本地环境

## 依赖简介

| 包名      | 用途                                                         |
| --------- | ------------------------------------------------------------ |
| commander | 读取命令行命令，知道用户想要做什么                           |
| inquirer  | 给用户提供一个提问流方式                                     |
| chalk     | 颜色插件，用来修改命令行输出样式，通过颜色区分info、error日志，清晰直观 |
| ora       | 用于显示加载中的效果，类似于前端页面的loading效果            |

## 实现过程

> 技术栈：JavaScript + Node

1. 创建脚手架执行文件：可以在任意目录下执行脚本文件

2. 解析命令行指令参数（[commander.js](https://www.npmjs.com/package/commander)）：创建类似 vue create 的命令

3. 设计命令行交互（[inquirer.js](https://www.npmjs.com/package/inquirer)）：提供模板选择

4. 创建工程化模板：利用现有的脚手架模板，如vue-cli，创建一个自己用得惯的，推送到远程仓库

5. 下载模板（download-git-repo.js）

6. 美化命令行（ora.js和chalk.js）：ora.js添加loading效果；chalk改变命令行颜色

7. 发布到npm

## 功能扩展

- 快速搭建项目目录结构
- 用`koa2`搭建`node`本地服务模板，用于在日常开发中快速创建模拟后端的接口（用处不大，接口太多了，没法定制）

## 参考文档

> [⚡【有手就行】轻松打造属于自己的Vue工程化脚手架工具 - 掘金 (juejin.cn)](https://juejin.cn/post/6867331101552181262#heading-0)
>
> [中高级前端必备：如何设计并实现一个脚手架 - 掘金 (juejin.cn)](https://juejin.cn/post/7021097811491946503?searchId=20231020102400019F139CAE5E86E86C2F#heading-0)


## 遇到的问题及解决方法

- https://blog.csdn.net/pro_fan/article/details/120457551

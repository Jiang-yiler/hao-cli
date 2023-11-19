#! /usr/bin/env node

const {program} = require('commander')
const {chooseTemplate} = require('./inquirers')
const download = require('download-git-repo')
const templateMap = require('./templateMap')
const ora = require('ora')

const chalk = require('chalk');
function start() {
    console.log(chalk.cyanBright('🫡🫡🫡 欢迎使用hao-cli命令行工具...\n'))

    program.version(require('./package.json').version) // 输出版对应的版本号

    /* 添加hao create命令。用于创建项目 */
    program
        .command('create <projectName>')
        .description('用于创建一个项目模板')
        .option("-T, --template [template]", "输入使用的模板名字")
        .action(async function(projectName, options){
            let template = options.template;
            projectName = projectName || 'untitled';

            if (!template) {
                template = await chooseTemplate();
            }
            console.log(chalk.rgb(69, 39, 160)('你选择的模板是 👉'),chalk.bgRgb(69, 39, 160)(template))
            const loading = ora({
                text: '正在下载模板...',
                color: 'yellow',
                spinner: {
                    interval: 80,
                    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]
                }
            })
            loading.start();

            const downloadUrl = templateMap.get(template);

            download(downloadUrl, projectName, {clone: true}, error => {
                if (error) {
                    loading.fail(`下载失败 😭😭😭`)
                    console.log(chalk.bgRgb(220,0,8)(`  创建项目失败：${projectName} `),'😭😭😭')
                    console.log('🧐🧐🧐 失败原因：',chalk.bgRgb(220,0,8)(error.message))
                } else {
                    loading.succeed(`成功创建项目：${projectName}`)
                    console.log('👆👆👆',chalk.rgb(69, 39, 160)('成功创建项目👉👉👉'),chalk.bgRgb(69, 39, 160)(projectName))
                }
            })
        });


    /* 添加hao checkAll命令。用于查看所有可用模板 */
    program
        .command('checkAll')
        .description('查看所有的模板')
        .action(function(){
            const templateList = [
                'vue2-default-template',
                'vue2-default-template-ts'
            ]
            templateList.forEach((temp,index) => {
                console.log(`(${index+1})  ${temp}`)
            })
        })

    program.parse(process.argv);
}

start();

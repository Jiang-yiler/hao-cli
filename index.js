#! /usr/bin/env node

const {program} = require('commander')
const {chooseTemplate} = require('./inquirers')
const download = require('download-git-repo')
const templateMap = require('./templateMap')

function start() {
    // console.log('Hello CLI')

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

            const downloadUrl = templateMap.get(template);

            download(downloadUrl, projectName, {clone: true}, error => {
                if (error) {
                    console.log(`创建项目失败：${projectName}`)
                    console.log('失败原因：',error)
                } else {
                    console.log(`成功创建项目：${projectName}`)
                    console.log(`所使用的模板：${template}`);
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

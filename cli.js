#!/usr/bin/env node
const program = require('commander')
const api = require('./index.js')
const pkg = require('./package.json')
program
  .version(pkg.version)


program
.command('add')
.description('add a task')
.action(function (task, otherTasks) {
    let words = '';
    if (otherTasks) {
        words += ' ' + otherTasks.join(' ');
    }
    api.add(words).then(() => {console.log('添加成功')}, () => {console.log('添加失败')});
  });

  program
.command('clear')
.description('clear all tasks')
.action(function () {
    api.clear().then(() => {console.log('清除完毕')}, ()=> {console.log('清除失败')})
  });

  if(process.argv.length == 2){
    //说明用户直接运行 node cli.js
    void api.showAll(); //void只是为了消除错误，实际没有意义
    return;
  }
program.parse(process.argv);//process.argv是用户传了那些参数


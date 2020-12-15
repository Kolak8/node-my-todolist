const homedir = require('os').homedir();//nodejs get home directory
const home = process.env.HOME ||  homedir; //nodejs get home variable
const fs = require('fs');
const p =require('path');
const dbPath = p.join(home, '.todo');


const db = {
    read(path = dbPath){
        return new Promise((resolve, reject)=>{
            fs.readFile(path,{flag:'a+'}, (error, data)=>{
                if(error){
                   return reject(error) //异步操作不能用return
                }

                let list;
                try{
                    list = JSON.parse(data.toString());
                }catch(error2){
                    list = []
                }
                resolve(list); //异步操作不能用return                       
            });
        })
    },
    
    write(list, path = dbPath){
        return new Promise( (resolve, reject)=>{
            const string = JSON.stringify(list);
            fs.writeFile(path, string, (error)=>{
                if(error){
                   return reject(error);
                }else{
                    resolve();
                }
            })
        })
    }
}

module.exports = db//node.js的导出方法
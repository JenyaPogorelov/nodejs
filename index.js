#!C:\Program Files\nodejs

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const inquirer = require('inquirer');


let executionDir = process.cwd();
const disk = executionDir.slice(0, 3);
const isFile = (filename) => fs.lstatSync(filename).isFile();
let list = fs.readdirSync(executionDir).sort((filename) => {
    if (isFile(filename)) return 1;
    return -1;
});

let fileManager = (async (list) => {
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list', //input, number, confirm, list, checkbox, password
            message: 'Choose a file to read: ',
            choices: ['..', ...list],
        },
    ]).then(({fileName}) => {
        if (isFile(executionDir + `\\${fileName}`)) {
            const fullFilePath = path.resolve(executionDir, fileName);
            const data = fs.readFileSync(fullFilePath, 'utf-8');
            console.log(data);
        } else {
            if (fileName === '..') {
                executionDir = disk + executionDir.slice(3, executionDir.lastIndexOf('\\'));
                list = fs.readdirSync(executionDir);
                fileManager(list);
            } else {
                list = fs.readdirSync(executionDir + `\\${fileName}`);
                executionDir = executionDir + `\\${fileName}`;
                fileManager(list);
            }

        }

    });
})

fileManager(list);

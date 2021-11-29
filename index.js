#!C:\Program Files\nodejs

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const inquirer = require('inquirer');
// const os = require ('os');
//
// console.log('OS', os.platform ())

let executionDir = process.cwd();
const isFile = (filename) => fs.lstatSync(filename).isFile();
let pathSeparator = '\\';
let disk = '';

let fileManager = ((list, whatFind) => {
    console.log(executionDir);
    inquirer.prompt([
        {
            name: 'fileName',
            type: 'list', //input, number, confirm, list, checkbox, password
            message: 'Choose a file to read: ',
            choices: ['..', ...list],
        },
    ]).then(({fileName}) => {
        if (isFile(path.resolve(executionDir, fileName))) {
            const fullFilePath = path.resolve(executionDir, fileName);
            const lineReader = readline.createInterface({
                input: fs.createReadStream(fullFilePath)
            });
            lineReader.on("line", (input) => {
                if (input.toString().lastIndexOf(whatFind.toString()) !== -1) console.log(input);
            })
        } else {
            if (fileName === '..') {
                executionDir = disk + executionDir.slice(3, executionDir.lastIndexOf(pathSeparator));
                list = fs.readdirSync(executionDir);
                fileManager(list, whatFind);
            } else {
                list = fs.readdirSync(path.resolve(executionDir, fileName));
                executionDir = path.resolve(executionDir, fileName);
                fileManager(list, whatFind);
            }
        }
    });
})

inquirer.prompt([
    {
        name: 'directoryPath',
        type: 'input', //input, number, confirm, list, checkbox, password
        message: 'Select Dir ',
    },
    {
        name: 'whatFind',
        type: 'input', //input, number, confirm, list, checkbox, password
        message: 'what find in file: ',
    },
]).then(({directoryPath, whatFind}) => {
    if (directoryPath) executionDir = directoryPath;
    if (executionDir.indexOf('\\') === -1) pathSeparator = '/';
    if (executionDir.indexOf(`${executionDir.slice(0, 1)}:\\`) !== -1) disk = executionDir.slice(0, 3);
    else disk = '/';
    let list = fs.readdirSync(executionDir);
    fileManager(list, whatFind);
})


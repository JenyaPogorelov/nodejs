#!C:\Program Files\nodejs

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const inquirer = require('inquirer');

// const directoryPath = process.argv[2];
// const whatFind = process.argv[3];

// const childProcess = require('child_process');
// const {log} = require("yarn/lib/cli");
// function getLocalDiskNames() {
//     const buffer = childProcess.execSync('wmic logicaldisk get Caption  /format:list').toString();
//     const lines = buffer.split('\r\r\n');
//     const disks = [];
//
//     for (const line of lines) {
//         if(!line) {
//             continue;
//         }
//
//         const lineData = line.split('=');
//         disks.push(lineData[1]);
//     }
//
//     return disks;
// }

let executionDir = process.cwd();
const disk = executionDir.slice(0, 3);
const isFile = (filename) => fs.lstatSync(filename).isFile();

let fileManager = ((list, whatFind) => {
    console.log('whatFind', whatFind);
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
            // const data = fs.readFileSync(fullFilePath, 'utf-8');
            // console.log(data);
            const lineReader = readline.createInterface({
                input: fs.createReadStream(fullFilePath)
            });
            lineReader.on("line", (input) => {
                if (input.lastIndexOf(whatFind) !== -1) console.log(input);
            })
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

inquirer.prompt([
    {
        name: 'directoryPath',
        type: 'input', //input, number, confirm, list, checkbox, password
        message: 'Select Dir (Диск:\\полный путь до файла): ',
    },
    {
        name: 'whatFind',
        type: 'input', //input, number, confirm, list, checkbox, password
        message: 'what find in file: ',
    },
]).then(({directoryPath, whatFind}) => {
    if (directoryPath) executionDir = directoryPath
    let list = fs.readdirSync(executionDir);
    fileManager(list, whatFind);
})


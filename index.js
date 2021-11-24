#!C:\Program Files\nodejs
const fs = require('fs');
const path = require('path');
// const yargs = require('yargs');
const readline = require('readline');
const inquirer = require('inquirer');
// const {query} = require("yarn/lib/cli");

// const filePath = path.join(__dirname, process.argv[2]);
// const data = fs.readFileSync(filePath, "utf-8");
//
// console.log(data);

// const options = yargs
//     .usage('Usage: -p <path> to file')
//     .option('p', {
//         alias: 'path',
//         describe: 'Path to the file',
//         type: 'string',
//         demandOption: true,
//     }).argv;
//
// console.log(options);

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.on('close', () => {
//     console.log('Closed')
// });
//
// rl.question('Please enter the path to the file', filePath => {
//     console.log(filePath);
//
//     rl.question('Please enter encoding', encoding => {
//         console.log(encoding);
//         rl.close();
//     });
// });

// const question = (query) => new Promise(resolve => rl.question(query, resolve));
//
// (async () => {
//     const filePath = await question('Please enter the path to the file: ');
//     const encoding = await question('Please enter encoding: ');
//
//
//     const fullFilePath = path.resolve(__dirname, filePath);
//     // const fullFilePath = path.join(__dirname, filePath);
//     console.log(fullFilePath);
//     const data = fs.readFileSync(fullFilePath, encoding);
//
//     console.log(data);
//     rl.close();
// })();

const executionDir = process.cwd();
const isFile = (filename) => fs.lstatSync(filename).isFile();
const list = fs.readdirSync('./').filter(isFile);

inquirer.prompt([
    {
        name: 'fileName',
        type: 'list', //input, number, confirm, list, checkbox, password
        message: 'Choose a file to read: ',
        // choices: ['qwer', 'erqwer', 'sdfasfd']
        choices: list,
    },
]).then(({fileName}) => {
    const fullFilePath = path.join(executionDir, fileName);
    const data = fs.readFileSync(fullFilePath, 'utf-8');

    console.log(data);
});


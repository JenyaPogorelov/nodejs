const worker_threads = require('worker_threads');
const readline = require('readline');
const fs = require("fs");

const findBlock = worker_threads.workerData;
const fullFilePath = worker_threads.workerData.fullFilePath;
const whatFind = worker_threads.workerData.whatFind;

const lineReader = readline.createInterface({
    input: fs.createReadStream(fullFilePath)
});
lineReader.on("line", (input) => {
    if (input.toString().lastIndexOf(whatFind.toString()) !== -1) console.log(input);
})

worker_threads.parentPort.postMessage('');
const fs = require('fs');
const readline = require('readline');

const ACCESS_LOG = './files/accessOriginal.log';
const ACCESS_FILE = './files/';
const IP_1 = '89.123.1.41';
const IP_2 = '34.48.240.111';

const lineReader = readline.createInterface({
    input: fs.createReadStream(ACCESS_LOG)
});

const writeFile = (IP, line) => {
    // const writeStream = fs.createWriteStream(
    //     ACCESS_FILE + IP + '_requests.log',
    //     {
    //         encoding: 'utf-8',
    //         flags: 'a',
    //         autoClose: true,
    //     }
    // );
    // writeStream.write(line.trim() + '\n');

    fs.appendFile(ACCESS_FILE + IP + '_requests.log',
        line.trim() + '\n',
        'utf-8',
        (err) => {
            if (err) {
                console.log(err)
            }
        }
    );
}

lineReader.on('line', async (input) => {
    if (input.split('-')[0].trim() === IP_1) {
        await writeFile(input.split('-')[0].trim(), input)
    }
    if (input.split('-')[0].trim() === IP_2) {
        await writeFile(input.split('-')[0].trim(), input)
    }
});
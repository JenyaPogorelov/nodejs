const colors = require('colors');

let num1, num2;
let nums = [];
let color = 'green';

if (!Number.isInteger(+process.argv[2]) || (!Number.isInteger(+process.argv[3]) && process.argv[3])) {
    console.log(colors.red('Введине число'));
    return;
} else if  (!process.argv[3]) {
    num1 = 1;
    num2 = +process.argv[2];
} else if (+process.argv[2] <= +process.argv[3]) {
    num1 = +process.argv[2];
    num2 = +process.argv[3];
} else {
    num1 = +process.argv[3];
    num2 = +process.argv[2];
}

console.log(`${colors.bold(`Вывод простых чичел в диапозоне ${num1} - ${num2}`)}`)

nextNum:
    for (let i = num1; i <= num2; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j === 0) continue nextNum;
        }
        nums.push(i);
    }

    if (nums.length === 0) {
        console.log(colors.red('В данном масиве нету простых чисел'))
    }
nums.forEach(element => {
    if (color === 'green') {
        console.log(colors.green(element));
    }
    if (color === 'yellow') {
        console.log(colors.yellow(element));
    }
    if (color === 'red') {
        console.log(colors.red(element));
    }
    color === 'green' ?
        color = 'yellow' :
        color === 'yellow' ?
            color = 'red' :
            color = 'green'
})

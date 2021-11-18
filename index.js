// console.log('Record 1');
//
// setTimeout(() => {
//     console.log('Record 2');
//     Promise.resolve().then(() => {
//         setTimeout(() => {
//             console.log('Record 3');
//             Promise.resolve().then(() => {
//                 console.log('Record 4');
//             });
//         });
//     });
// });
//
// console.log('Record 5');
//
// Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));
//
// // Ответ: 1 5 6 2 3 4

const colors = require('colors');
const moment = require('moment');
require('moment-precise-range-plugin');

moment.locale("ru")

let dateReg = /^(19|20)[0-9]{2}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])-([01]?[1-9]|2[0-3])-([0-5]?[0-9])-([0-5]?[0-9])$/

if (!(process.argv.length > 2)) {
    console.log('Введите данные')
    return;
} else {
    process.argv.forEach(async (element, index) =>  {
        if (index > 1) {
            let time = process.argv[index];

            if (!time.match(dateReg)) {
                console.log("Неверный формат даты, Верный формат:", colors.red("год-месяц-день-час-минута-секунда"));
            } else {
                let timeThen = moment(time, 'YYYY M D h mm ss').format('YYYY-M-D hh:mm:ss');
                let timer = await setInterval(() => {
                    let timeNow = moment().format('YYYY-M-D hh:mm:ss')
                    let diff = moment.preciseDiff(timeThen, timeNow);

                    if (timeThen <= timeNow) {
                        console.clear();
                        console.log("Время вышло")
                        clearInterval(timer);
                    } else {
                        console.clear();
                        console.log(diff);
                    }
                }, 1000)
            }
        }
    })
}



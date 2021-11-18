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
// // 1 5 6 2 3 4

//
//https://coderoad.ru/26063882/%D0%9A%D0%B0%D0%BA-%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C-%D1%80%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D1%83-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-2-%D0%B4%D0%B0%D1%82%D0%B0%D0%BC%D0%B8-%D0%B2-%D0%B3%D0%BE%D0%B4%D0%B0%D1%85-%D0%BC%D0%B5%D1%81%D1%8F%D1%86%D0%B0%D1%85-%D0%B8-%D0%B4%D0%BD%D1%8F%D1%85-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-moment-js
//


const colors = require('colors');
const moment = require('moment');
require('moment-precise-range-plugin');

moment.locale("ru")

if (!(process.argv.length > 2)) {
    console.log('Введите данные')
    return;
}

// let dateReg = /^([0-5]?[0-9])-([0-5]?[1-9])-([01]?[1-9]|2[0-3])-(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(19|20)[0-9]{2}$/
let dateReg = /^(19|20)[0-9]{2}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])-([01]?[1-9]|2[0-3])-([0-5]?[1-9])-([0-5]?[0-9])$/
let time = process.argv[2];

let timeThen = moment(time, 'YYYY M D h mm ss').format('YYYY-M-D hh:mm:ss');

let timer = setInterval(() => {
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
},1000 )

// let m1 = moment('2/22/2013','M/D/YYYY');
// let m2 = moment('4/5/2014','M/D/YYYY');
// // let diff = moment.preciseDiff(m1, m2);
// console.log(moment(m1).preciseDiff(m2));
// console.log(moment().format('YYYY-M-D-h-mm-ss'))

class Time {
    constructor(timeSplit) {
        this.year = +timeSplit[5];
        this.month = +timeSplit[4];
        this.day = +timeSplit[3];
        this.hour = +timeSplit[2];
        this.minut = +timeSplit[1];
        this.second = +timeSplit[0];
    }
}

let timeDiff = (timeNow, timeEnd) => {

    // return new Date();
    return new Time([
        timeEnd.second >= timeNow.second ? timeEnd.second - timeNow.second : 110 - timeNow.second,
        timeEnd.minut - timeNow.minut,
        timeEnd.hour - timeNow.hour,
        timeEnd.day - timeNow.day,
        timeEnd.month - timeNow.month,
        timeEnd.year - timeNow.year,
    ]);
}

if (!time.match(dateReg)) {
    console.log("Неверный формат даты, Верный формат:", colors.red("секунда-минута-час-день-месяц-год"));
} else {
    let timeSplitArr = time.split('-');
    let timeEnd  = new Time(timeSplitArr);

    let timeNowArr = [
        new Date().getSeconds(),
        new Date().getMinutes(),
        new Date().getHours(),
        new Date().getDate(),
        new Date().getMonth()+1,
        new Date().getFullYear()
    ]
    let timeNow  = new Time(timeNowArr);

    // console.log('timeNow', timeNow);
    // console.log('timeEnd', timeEnd);
    //
    // console.log(timeDiff(timeNow, timeEnd))


    //
    // setInterval(() => {
    //
    //     console.log('timeNow', timeNow);
    //     console.log('timeEnd', timeEnd);
    //     console.log(timeDiff(timeNow, timeEnd))
    // },1000 )
    // console.log(timeDiff(timeNow, timeEnd));

}



// console.log(time.match(dateReg))

//
// time.split()
//
// console.log(time.split('-'));

//^(0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2}$

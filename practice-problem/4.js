// Leap year

let year = prompt("Enter a year: ");
parseInt(year)

const leapYear = (year) => {
    if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
        console.log('Leap year!');
    }else{
        console.log('Leap year!');
    }
}

leapYear(year)
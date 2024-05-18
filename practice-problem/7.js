// duplicate value remove

var numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];
let num = []

numbers.forEach(n => {
   if( num.indexOf(n) == -1){
    num.push(n);
}
})

console.log(num);
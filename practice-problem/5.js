// 1 to 50 divisor
let numbers= []

for(let i = 1; i <= 50; i++){
    if(i % 3 == 0 || i % 5 == 0){
        numbers.push(i);
    }
}

console.log(numbers);
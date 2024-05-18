earn = [1000, 2000, 2500]
cost = 5000;



const monthlySavings = (earn, cost) => {
    let totalEarning = 0;

    if(!Array.isArray(earn) || (typeof cost != 'number')){
        return 'Invalid Input'
    }

    earn.forEach(e => {
        if(e >= 3000){
            let tax = (3000/100) * 20;
            totalEarning+=(e-tax);
        }else{
            totalEarning+=e;
        }
    })

    let save = totalEarning - cost;

    if(cost >= 0){
        return save;
    }else {
        return 'earn more';
    }

}

let ms = monthlySavings(earn, cost);
console.log(ms);
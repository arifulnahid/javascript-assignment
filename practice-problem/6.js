// long friend
var friends = ["ArifulIslam","rahim", "karim", "abdul", "sadsd", "heroAlom"];

let big;
let len = 0;
friends.forEach(fr => {
    if(fr.length > len){
        big = fr
        len = fr.length
    }
})
console.log(big);
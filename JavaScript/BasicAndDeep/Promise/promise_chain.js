function multiplyTwo(value) {
    return value * 2;
}

function increment(value) {
    return value + 1;
}

function output(value) {
    console.log(value);
}

var pr = Promise.resolve(2);
pr
.then(multiplyTwo) // 2 * 2
.then(increment) // 4 + 1
.then(output); // 5

// ---------------------------------

var pr1 = Promise.resolve(12);
pr1.then(function(value) {
    console.log("1. first chain's value : " + value); // 12

    return new Promise(function(resolve, reject) {
        resolve(value * 2);
    });
})
.then(function(value) {
    console.log("1. second chain's value : " + value); // 24
});

// ---------------------------------

var pr2 = Promise.resolve(12);
pr2.then(function(value) {
    console.log("2. first chain's value : " + value); // 12

    return new Promise(function(resolve, reject) {
        throw new Error("Throw an Error!!");
        resolve(value * 2);
    });
})
.then(function(value) {
    // not called
    console.log("2. second chain's value : " + value);
})
.catch(function(error) {
    console.log("2. Error throwing");
    console.log(error);
});
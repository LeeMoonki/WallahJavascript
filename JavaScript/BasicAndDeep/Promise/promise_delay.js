function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time);
    });
}

// example of usage


delay(1000)
.then(function() {
    console.log("after a second");
    return delay(2000);
})
.then(function() {
    console.log("after two seconds");
});
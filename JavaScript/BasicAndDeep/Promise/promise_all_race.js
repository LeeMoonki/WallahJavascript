// all과 race 모두 Promise 객체를 담은 배열을 arguments 로 넘긴다

// all 은 모든 Promise 객체가 resolved 됐을 때 각 Promise 객체가 반환한 value 들을 모아 resolve한다.

var inven1 = [], inven2;
var pr1_all = Promise.resolve({
    then: function(resolve) {
        setTimeout(function() { resolve(12) }, 1000);
    }
}).then(function(value) { inven1.push(value); return value; });
var pr2_all = Promise.resolve({
    then: function(resolve) {
        setTimeout(function() { resolve(24) }, 2000);
    }
}).then(function(value) { inven1.push(value); return value; });
var pr3_all = Promise.resolve({
    then: function(resolve) {
        setTimeout(function() { resolve(36) }, 3000);
    }
}).then(function(value) { inven1.push(value); return value; });

var pr_all = Promise.all([ pr1_all, pr2_all, pr3_all ]);
pr_all.then(function(values) {
    inven2 = values;
    console.log("pr_all inven1 : ", inven1);
    console.log("pr_all inven2 : ", inven2);
});


// race 는 Promise 객체 중 제일 먼저 logic을 마친 Promise 객체를 통해 resolve 한다. 

var inven3 = [], inven4;
var pr1_race = Promise.resolve({
    then: function(resolve) {
        setTimeout(function() { resolve(12) }, 1000);
    }
}).then(function(value) { inven3.push(value); return value; });
var pr2_race = Promise.resolve({
    then: function(resolve) {
        setTimeout(function() { resolve(24) }, 2000);
    }
}).then(function(value) { inven3.push(value); return value; });
var pr3_race = Promise.resolve({
    then: function(resolve) {
        setTimeout(function() { resolve(36) }, 3000);
    }
}).then(function(value) { inven3.push(value); return value; });

var pr_race = Promise.race([ pr1_race, pr2_race, pr3_race ]);
pr_race.then(function(values) {
    inven4 = values;
    console.log("pr_race inven3 : ", inven3);
    console.log("pr_race inven4 : ", inven4);
});


// race가 제일 먼저 resolve 된 Promise 객체만을 가지고 resolve 하지만
// 나머지 Promise 객체들도 계속 실행된다.
// 따라서 inven3도 inven1처럼 [ 12, 24, 36 ] 이다.

setTimeout(function() { console.log("pr_race inven1 after 7secs : ", inven1); }, 7000);
setTimeout(function() { console.log("pr_race inven3 after 7secs : ", inven3); }, 7000);
// 큰 규모의 배열을 위한 map
// 이벤트 큐를 이용해 큰 큐모의 배열에 대한 map을 구현한다.
// 이렇게 함으로써 이벤트 루프에서 대기 중인 다른 이벤트와 함께 실행되도록 해야한다.
// reference : You don't know Js, Asynchrony: Now & Later
let mapLargeArr = function(largeArr, mapper, chunkSize = 1000) {
  let res = [];

  mapLargeArr = function(d) {
    let chunk = d.splice(0, chunkSize);

    res = res.concat(chunk.map(mapper));

    return new Promise(resolve => {
      if (d.length > 0) {
        setTimeout(() => {
          resolve(mapLargeArr(d).then(res => res));
        }, 0);
      } else {
        resolve(res);
      }
    })
    
  };

  return mapLargeArr(largeArr);
}

// example
const testarr = [];

for (let i = 0; i < 1000000; i++) {
  testarr.push(i);
}

const result = mapLargeArr(testarr, v => v * 2);

result.then(r => {
  console.log('result : ', r.length, r[0], r[r.length - 1]);
});
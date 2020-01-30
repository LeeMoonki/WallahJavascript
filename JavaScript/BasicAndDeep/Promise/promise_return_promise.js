// 예를 들어 하나의 API를 호출하고 조건에 따라 내부에서 다른 API를 호출해야 하는 경우

var apiRequst = function(num) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (num > 0) {
        console.log('outer promise resolve');
        resolve({success: (~~(Math.random() * 10)) % 2 === 0, val: num});
      } else {
        console.log('outer promise reject');
        reject(num);
      }
    }, 2000);
  })
};

apiRequst(10).then(function(res) {
  if (res.success) {
    console.log('1. resolve success : ', res);
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({...res, from: 'inner'});
      }, 3000);
    });
  } else {
    console.log('1. resolve fail : ', res);
    return Promise.resolve({...res, from: 'outer'});
  }
}).then(function(res) {
  console.log('2. then : ', res);
});
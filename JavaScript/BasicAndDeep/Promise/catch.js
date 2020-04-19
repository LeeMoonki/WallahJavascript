// reject된 promise를 catch하여 반환하면 반환된 Promise 값을 통해서 다시 catch하지 못한다.

const rejectPromise1 = Promise.reject('reject1');
const rejectValue = rejectPromise1.catch(err => err);

rejectValue.then(res => console.log('resolved : ', res), err => console.log('rejected : ', err)); // resolved : reject1

const rejectPromise2 = Promise.reject('reject2');
rejectPromise2.catch(err => err);

rejectPromise2.then(res => console.log('resolved : ', res), err => console.log('rejected : ', err)); // rejected : reject2


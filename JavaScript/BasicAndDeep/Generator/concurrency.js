function *counter(length, id) {
  for (let i = 0; i < length; i++) {
    console.log('make counted number ', id, i);
    yield i;
  }
}

// generator iterator는 미리 값을 만들지 않고 값을 요청할 때 값을 만들어 전달한다.
for (const num of counter(5, 'foo')) {
  console.log(num);
}

// 이렇게 generator iterator를 일괄호출하게 되면 yield를 일괄 실행하고 최종 결과를 내뱉는다.
console.log([...counter(3, 'bar')]);


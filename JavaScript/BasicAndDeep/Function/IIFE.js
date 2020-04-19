// Immediately-invoked Function Expression

// ref : https://medium.com/@vvkchandra/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6

// function definition after unary operator, will be treated as IIFE
// for example,
!function() {
  console.log('IIFE after unary operator');
}()

// basic usage of IIFE

// (function() {
//   console.log('IIFE version 1');
// })();

// (function() {
//   console.log('IIFE version 2');
// }());

// Parentheses around the function expression basically force the function to become an expression instead of a statement.
// But when it's obvious to the JavaScript engine that it's a function expression, we don't technically need those surrounding parentheses as shown below.

let result = function() {
  return 'foo';
} ();

console.log('result : ', result);

let getBar = function() {
  return function named() {
    return 'bar';
  } ();
}

console.log('getBar : ', getBar());
// call, apply, bind 함수 비교

// .bind() 는 나중에 특정 context에서 실행하기 원하는 함수를 원할 때 사용한다.
// .call()과 .apply()는 특정 context에서 함수를 바로 실행하기 위해 사용한다.

// 예를 들어 
// MDN 의 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
// 를 보면 .bind()의 Polyfill이 있는데 다음과 같다.


if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }
  
      var aArgs   = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP    = function() {},
          fBound  = function() {
            return fToBind.apply(this instanceof fNOP
                   ? this
                   : oThis,
                   aArgs.concat(Array.prototype.slice.call(arguments)));
          };
  
      if (this.prototype) {
        // Function.prototype doesn't have a prototype property
        fNOP.prototype = this.prototype; 
      }
      fBound.prototype = new fNOP();
  
      return fBound;
    };
  }

// 즉, 
var bound = tobind.bind(context);
// 는 tobind 라는 함수를 context에 bind된 함수를 bound 에 할당한다.
// bound(arguments)는 tobind.apply(context, arguments) 와 같다.

// 따라서 bind, apply, call 은 별개의 것이 아니라 
// 특정 context에서 즉시 실행하느냐(call, apply) 또는 rebind하지 않는한
// 앞으로 해당 context에서 실행하도록 하느냐(bind)의 차이이다.

// call, apply는 함수 실행 결과를 반환하지만 bind는 context에서 실행될 함수를 반환한다.
const o = {
  _a: 10,
  get a() {
    return this._a;
  },
  set a(value) {
    this._a = value;
  }
};

console.log('get : ', o._a, o.a);
o.a = 20;
console.log('get : ', o._a, o.a);

const o1 = (() => {
  let _a = 0;

  return {
    get a() {
      return _a;
    },
    set a(value) {
      _a = value;
    }
  };
})();

console.log('get : ', o1._a, o1.a, o1);
o1.a = 20;
console.log('get : ', o1._a, o1.a, o1);

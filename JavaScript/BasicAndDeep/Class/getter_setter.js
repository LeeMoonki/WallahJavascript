class Temp {
  constructor() {
    
    let a = 100;
    this.obj = {
      get a() {
        return a;
      },
      set a(value) {
        a = value + 10;
      }
    };
  }
}

const t = new Temp();
const t1 = new Temp();

console.log('get : ', t.obj.a);
t.obj.a = 10;
console.log('get : ', t.obj.a);
console.log('get : ', t1.obj.a);

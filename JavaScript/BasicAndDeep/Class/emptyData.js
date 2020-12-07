class Parent {
  constructor() {
    this.A = 100;
    this.B = 200;
  }
}

class Child extends Parent {
  constructor() {
    super();

    this.a = 10;
    this.b = 20;
  }

  loop() {
    console.log('-----------------------');
    for (let k in this) {
      console.log('loop : ', k, this[k]);
    }
  }

  empty() {
    for (let k in this) {
      delete this[k];
    }
  }
}

const c1 = new Child();

c1.loop();
c1.empty();
c1.loop();

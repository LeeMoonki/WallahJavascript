class Parent {
  hi() {
      console.log('hi parent!');
  }

  init() {
    this.prepare();
  }
  prepare() {
    console.log('prepare Parent');
  }
}

class Child extends Parent {
  hi() {
      super.hi()
      console.log('hi child')
  }

  prepare() {
    super.prepare();
    console.log('prepare Child');
  }
}

class Child1 extends Parent {
  hi() {
      console.log('hi child1')
  }

  prepare() {
    console.log('prepare Child1');
  }
}

class Child2 extends Parent {
    
}

var c = new Child();
var c1 = new Child1();
var c2 = new Child2();

c.hi();
c1.hi();
c2.hi();
console.log('---------------');
c.init();
c1.init();
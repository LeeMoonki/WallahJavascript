class Temp {
  constructor() {
    let _value = null;
    this.value = {
      set: function(v) {
        _value = v;
      },
      get: function() {
        return _value;
      }
    };
  }
}

const t = new Temp();

console.log();

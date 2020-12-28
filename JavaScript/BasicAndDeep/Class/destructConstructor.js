class Temp {
  constructor(values) {
    const vals = typeof values === 'object' ? values : {};

    for (let k of Object.keys(vals)) {
      this[k] = values[k];
    }
  }
}

const t1 = new Temp({ a: 10, b: 20 });

console.log(t1, t1.a, t1.b);

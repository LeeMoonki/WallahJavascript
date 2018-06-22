function Car(name, year) {
    this.name = name;
    this.year = year;
}

Car.prototype.engineStart = function() {
    console.log(this.name + ' ' + this.year +  " engine start");
}

var spark = new Car('스파크', 2017);
var rangerover = new Car('랜드 로버', 2018);

console.log(spark.name, spark.year); // 스파크 2017
console.log(rangerover.name, rangerover.year) // 랜드 로버 2018

spark.engineStart(); // 스파크 2017 engine start
rangerover.engineStart(); // 랜드 로버 2018 engine start
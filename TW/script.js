var hash = "";
var count = 2;
var n = 3;
for (var x = 1; x <= 7; x++) {
  while (hash.length != count) {
    hash += "#";
  }
  hash += "\n";
  count += n;
  n++;
}
console.log(hash);

var hash = "";
var count = 1;
var n = 3;

for (var x = 1; x <= 7; x++) {
  for (var i = 0; i < count; i++) {
    hash += "#";
  }
  hash += "\n";
  count += n;
  n++;
}

console.log(hash);

let firstName = null;
let lastName = null;
let nickName = "coderBond";
console.log(firstName ?? lastName ?? "Anonymous" ?? nickName);

function onZoom(x) {
  console.log("Zoom active for", x);
}
function startClass(x, y, z) {
  console.log(" Class starts at", x);
  y(z);
}
startClass("20:00", onZoom, "FS");

console.log(
  (function f(n) {
    return n > 1 ? n * f(n - 1) : n;
  })(5)
);

(function () {
  try {
    throw new Error();
  } catch (x) {
    var x = 1,
      y = 2;
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();

let a = [10, 20, 30];
a[10] = 100;
console.log(a[6]);
let b = [undefined];
b[2] = 1;
console.log(b);
console.log(b.map((e) => 99));

function orderPizza(type, ingredients, callback) {
  console.log("Pizza ordered...");
  console.log("Pizza is for preparation");
  setTimeout(function () {
    let msg = `Your ${type} ${ingredients} Pizza is ready! The total bill is
        $10`;
    callback(msg);
  }, 3000);
}
orderPizza("Vegeterian", "Cheese", function (message) {
  console.log(message);
});

class Employee {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  detail() {
    console.log(this.id + " " + this.name);
  }
}
let e1 = new Employee(10, "Qadir Adamson");
let e2 = new Employee("Victor Hugo");
let e3 = new Employee(12);
e1.detail();
e2.detail();
e3.detail();


class Animal {
    constructor(name, weight) {
    this.name = name;
    this.weight = weight;
    }
    eat() {
    return `${this.name} is eating`;
    }
    sound(){
    return `${this.name} is says`;
    }
    }
    class Cat extends Animal {
    constructor(name, weight) {
    super(name, weight);
    }
    sound(){
    return `${super.sound()} Meow!`;
    }
    }
    let felix=new Cat("felix",5)
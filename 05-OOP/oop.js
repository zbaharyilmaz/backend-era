"use strict"

/* -------------------------------------------------------
                OBJECTS & OOP & CLASSES
------------------------------------------------------- *

//? OBJECTS
const expObj = {

    propertyName: 'value', // attribute, field // object, array, boolean, number, string, function

    methodName: function () {
        return console.log('Functions called method in object')
    },

    methodNameAltarnative() {
        return console.log('this is altarnative decleration of function in object')
    }
};

console.log(expObj.propertyName);
expObj.methodName();

console.log(expObj['propertyName']);
expObj['methodName']();

console.clear()

/*------------------------------------------------------- *
//? 'THIS' KEYWORD Refers to the execution context (object)


const Car = {
    brand: 'Ford',
    model: 'Mustang',
    year: 1967,
    details: {
        color1: 'white',
        color2: 'black',
        engineSize: 4900
    },

    getDetail: function () {
        // console.log(this);
        return console.log(this.details)
    },

    getDetailArr: () => {
        return console.log(this.details)
    }
};


// Car.getDetail()
Car.getDetailArr()

/*------------------------------------------------------- *
//? "NEW" KEYWORD Creates a new instance of an object

const carConstructor = function (brand, model, year) {
    this.brand = brand
    this.model = model
    this.year = year
};

const car = new carConstructor('Ford', 'Mustang', 1967)

console.log(car);
console.log(car.brand);

const car2 = new carConstructor('BMW', '2.15', 1967)

console.log(car2);
console.log(car2.brand);

/*------------------------------------------------------- */
//? OOP: Object Oriented Programming





/*------------------------------------------------------- */
/*------------------------------------------------------- */
/*------------------------------------------------------- */



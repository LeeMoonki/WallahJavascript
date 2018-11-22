// ref :  https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript

var mySingleton = (function() {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {
        // Singleton

        // Private methods and variables
        function privateMethod() {
            console.log('private method');
        }

        var privateVariable = "private variable";

        var privateRandomNumber = Math.random();

        return {
            // Public methods and variables
            publicMethod: function () {
                console.log('public method');
            },
            publicProperty: 'public property',
            getRandomNumber: function() {
                return privateRandomNumber;
            }
        }
    }

    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function() {
            if (!instance) { instance = init(); }
            return instance;
        }
    }
}());

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber());
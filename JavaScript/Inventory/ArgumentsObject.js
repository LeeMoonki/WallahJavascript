function ArgTest(a, b) {
    var s = ""
        , i = 0;

    s += "Expected Arguments: " + ArgTest.length;
    s += "\n";
    s += "Passed Arguments: " + arguments.length;
    s += "\n";

    s += "The individual arguments are: ";
    for (i = 0; i < arguments.length; i++) {
        s += ArgTest.arguments[i];
        s += " / ";
    }

    console.log(s);
}

ArgTest(1, 2, "Hello World", new Date());

// Result : 
// Expected Arguments: 2
// Passed Arguments: 4
// The individual arguments are: 1 / 2 / Hello World / Thu Jan 04 2018 14:44:12 GMT+0900 (대한민국 표준시) /
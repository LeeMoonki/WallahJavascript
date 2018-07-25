// A spy only exists in the 'describe' or 'it' block
// in which it is defined and will be removed after each spec.
describe('A spy', function() {
    var foo, bar = null;

    beforeEach(function() {
        foo = {
            setbar: function(value) {
                bar = value;
            }
        };

        // spyOn(obj, methodName) -> {Spy}
        // Install a spy onto an existing object
        // obj : The object upon which to install the Spy
        // methodName : The name of the method to replace with a Spy
        spyOn(foo, 'setbar');

        foo.setbar(123);
        foo.setbar(456, 'hello spy');
    });

    it('spy가 호출 됐는지 추적', function() {
        expect(foo.setbar).toHaveBeenCalled();
    });

    it('spy가 몇 번 호출됐는지 추적', function() {
        expect(foo.setbar).toHaveBeenCalledTimes(2);
    });

    it('spy호출시 넘어온 모든 인자를 추적', function() {
        expect(foo.setbar).toHaveBeenCalledWith(456, 'hello spy');
        expect(foo.setbar).toHaveBeenCalledWith(123);
    });

    it('spy.calls namespace', function() {
        
        // Spy.callData 's properties
        // object : 'this' context for the invocation
        // invocationOrder : Order of the invocation
        // args : The arguments passed for this invocation

        // Get the raw calls array for this spy
        // all() -> {Array.<Spy.callData>}
        console.log('all() : ', foo.setbar.calls.all()); 

        // Get all of the arguments for each invocation of this spy in the order they were received
        // allArgs() -> {Array}
        console.log('allArgs() : ', foo.setbar.calls.allArgs()); // 

        // Check whether this spy has been invoked
        // any -> {Boolean}
        console.log('any() : ', foo.setbar.calls.any());

        // Get the arguments that were passed to a specific invocation of this spy
        // argsFor(index) -> {Array}
        console.log('argsFor() : ', foo.setbar.calls.argsFor(), foo.setbar.calls.argsFor(0), foo.setbar.calls.argsFor(1));
        
        // Get the number of invocations of this spy
        // count() -> {Integer}
        console.log('count() : ', foo.setbar.calls.count());
        
        // Get the first invocation of this spy
        // first() -> {ObjectSpy.callData}
        console.log('first() : ', foo.setbar.calls.first());

        // Get the most recent invocation of this spy
        // {ObjectSpy.callData}
        console.log('mostRecent() : ', foo.setbar.calls.mostRecent());
        
        // Reset this spy as if it has never been called
        console.log('reset() : ', foo.setbar.calls.reset());
        console.log('all() after reset() : ', foo.setbar.calls.all());
        
        expect(0).toBe(0);
    });
});

// jasmine.createSpy([name, originalFn]) -> {Spy}
// Create a bare Spy object. This won't be installed anywhere and will not have nay implementation behind it
// name : Name to give the spy. This will be displayed in failure messages
// originalFn : Function to act as the real implementation
describe('spies:createSpy', function() {
    var whatAmI;

    beforeEach(function() {
        whatAmI = jasmine.createSpy('whatAmI');
        whatAmI('I', 'am', 'a', 'spy');
    });

    it('spy가 호출됐는지 추적', function() {
        expect(whatAmI).toHaveBeenCalled();
    });
});

// jasmine.createSpyObj([baseName, methodNames])
// Create an object with multiple 'Spy's as its members
// baseName : Base name for the spies in the object
// methodNames : Array of method names to create spies for, or Object whose keys will be method names and values the 'returnValue'
describe('spies:createSpyObj', function() {
    var tape, animal;
    
    beforeEach(function() {
        // In order to create a mock with multiple spies,
        // use jasmine.createSpyObj and pass an array of strings.
        // It returns an object that has a property for each string that is a spy.

        tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

        tape.play();
        tape.pause();
        tape.rewind(0);

        animal = jasmine.createSpyObj('dog', { run: 'running' });
    });

    it('요청되는 각 함수마다 spy를 생성한다', function() {
        expect(tape.play).toBeDefined();
        expect(tape.pause).toBeDefined();
        expect(tape.stop).toBeDefined();
        expect(tape.rewind).toBeDefined();

        expect(animal.run()).toBe('running');
    });
});
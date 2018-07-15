describe('DiContainer', function() {
    var container;
    beforeEach(function() {
        container = new DiContainer();
    });

    describe('register(name, dependencies, func)', function() {
        it('인자가 하나라도 빠졌거나 타입이 잘못되면 예외를 던진다.', function() {
            var badArgs = [
                // 인자가 아예 없는 경우
                [],
                // name만 있는 경우
                ['Name'],
                // name과 dependencies만 있는 경우
                ['Name', ['Dependency1', 'Dependency2']],
                // dependencies가 빠진 경우
                ['Name', function() {}],
                // 타입이 잘못된 다양한 사례들
                [1, ['a', 'b'], function() {}],
                ['Name', [1, 2], function() {}],
                ['Name', ['a', 'b'], 'should be a function']
            ];

            badArgs.forEach(function(args) {
                // expect(function() {
                //     container.register.apply(container, args);
                // }).toThrow();
                expect(function() {
                    container.register.apply(container, args);
                }).toThrowError(container.messages.registreRequiresArgs);
            });
        });
    });

    describe('get(name)', function() {
        it('성명이 등록되어 있지 않으면 undefined를 반환한다.', function() {
            expect(container.get('noDefined')).toBeUndefined();
        });

        it('등록된 함수를 실행한 결과를 반환한다.', function() {
            var name = 'MyName',
                returnFromRegisteredFunction = 'something';
            container.register(name, [], function() {
                console.log('no dep : ', arguments);
                return returnFromRegisteredFunction;
            });

            expect(container.get(name)).toBe(returnFromRegisteredFunction);
        });

        it('등록된 함수에 의존성을 제공한다', function() {
            var main = 'main',
                mainFunc,
                dep1 = 'dep1',
                dep2 = 'dep2';
            container.register(main, [dep1, dep2], function(dep1Func, dep2Func) {
                console.log('there are deps : ', arguments);
                return function() {
                    
                    return dep1Func() + dep2Func();
                };
            });

            container.register(dep1, [], function() {
                return function() { return 1; };
            });

            container.register(dep2, [], function() {
                return function() { return 2; };
            });

            mainFunc = container.get(main);
            // mainFunc
            // function() { return dep1Func() + dep2Func(); }
            expect(mainFunc()).toBe(3);
        });
    });
});
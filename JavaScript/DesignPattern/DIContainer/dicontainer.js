DiContainer = function() {
    if (!(this instanceof DiContainer)) {
        return new DiContainer();
    }

    this.registrations = [];
};

DiContainer.prototype.messages = {
    registreRequiresArgs: '이 생성자 함수는 인자가 3개 있어야 합니다. ' + '문자열, 문자열 배열, 함수'
};

// register에 등록하는 함수는 
// 함수를 반환하는 함수이어야 한다
DiContainer.prototype.register = function(name, dependencies, func) {
    var i;

    if (typeof name !== 'string'
        || !Array.isArray(dependencies)
        || typeof func !== 'function') {
        throw new Error(this.messages.registreRequiresArgs);
    }

    for (i = 0; i < dependencies.length; i++) {
        if (typeof dependencies[i] !== 'string') {
            throw new Error(this.messages.registreRequiresArgs);
        }
    }

    this.registrations[name] = { dependencies: dependencies, func: func };
};

DiContainer.prototype.get = function(name) {
    var self = this, 
        registration = this.registrations[name], 
        dependencies = [];
    if (!registration) {
        return void 0;
    }

    registration.dependencies.forEach(function(dependencyName) {
        var dependency = self.get(dependencyName);
        if (!!dependency) {
            dependencies.push(dependency);
        }
    });

    // 함수의 결과를 반환하는 것이 아니라
    // 의존성이 있다면 의존성을 주입한 '함수'를 반환한다.
    return registration.func.apply(null, dependencies);
};
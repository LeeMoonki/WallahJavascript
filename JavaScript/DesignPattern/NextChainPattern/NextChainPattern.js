const nextChain = function(chains) {
    // 여기에 반복 조건을 두게되면 closure이기 때문에 제대로 동작하지 않는다.
    return function(to, from, next) {
        let flag = true, len = chains.length, i = 0;
        while(flag && i < len) {
            flag = false;
            if (i + 1 === len) {
                chains[i](to, from, next);
            } else {
                chains[i](to, from, () => { ++i; flag = true; });
            }
        }
    }
};

// example
nextChain([
	function(to, from, next) {
		console.log('first : ', to, from);
		next();
	},
	function(to, from, next) {
		console.log('second : ', to, from);
		next();
    },
	function(to, from, next) {
		console.log('third : ', to, from);
		next();
    }
])('toto', 'fromfrom', () => { console.log('last next'); })
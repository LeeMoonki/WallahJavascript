const nextChain = function(chains) {
    let flag = true, len = chains.length, i = 0;
    return function(to, from, next) {
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
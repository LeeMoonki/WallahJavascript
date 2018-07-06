// 필요 함수
// -------------------------------------------------------------------------------------------------------------------
var $ = Object.create(null);
$.ajax = function(option) {
    if (!option.time) { option.time = 5000; }

    setTimeout(function() { option.success(option.type + ' ' + option.url + '?title=' + option.data.title); }
    , option.time);

    // setTimeout(function() { option.success(option.data.title); }
    // , option.time);
};
    
function ajaxreq(url, type, data, timecounter) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: resolve,
            error: reject,
            time: timecounter
        });
    });
}
// -------------------------------------------------------------------------------------------------------------------

// 테스트 중

function runAll() {
    var args = [].slice.call(arguments), its = [], self, res = [];
    self = this;
    args.forEach(function(gen, index){
        its.push(gen.call(self));
    });

    its.forEach(function(it) {
        it.next();
    });

    Promise.resolve().then(function(val) {
        
    });

    function _next(its) {
        var msgs = [];
        its.forEach(function(it) { msgs.push(it.next()); });
        return msgs;
    }
}

console.log(runAll(
    function *(res) { 
        res = [];

        var p1 = ajaxreq('http://url1.co.kr', 'get', { title: 'hi1' }, 1000); 

        yield;

        res.push(yield p1);
    },
    function *(res) { 
        var p2 = ajaxreq('http://url2.co.kr', 'get', { title: 'hi2' }, 3000);

        yield;

        res.push(yield p2);
    }
));
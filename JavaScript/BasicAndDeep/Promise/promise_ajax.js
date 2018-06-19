// jquery ajax를 가정한다

var $ = Object.create(null);
$.ajax = function(option) {
    setTimeout(function() { option.success(option.type + ' ' + option.url + '?title=' + option.data.title) }
    , 5000);
};

function ajaxreq(url, type, data) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: resolve,
            error: reject
        });
    });
}

ajaxreq('/api/articles', 'get', { title: "HelloPromise!" })
.then(function(value) {
    console.log(value);
});
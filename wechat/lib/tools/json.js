json2query = function(json) {
    var arr = [];
    for (var k in json) {
        arr.push(k + "=" + json[k]);
    }
    return arr.join("&");
}
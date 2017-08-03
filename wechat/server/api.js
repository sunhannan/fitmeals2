Picker.route('/.well-known/pki-validation/fileauth.txt', function(params, req, res, next) {
    res.end(`xxxxx`);
});

Picker.route('/xxxx.txt', function(params, req, res, next) {
    res.end("xxxxx");
})


Picker.route('/_wx/pay/notify', function(params, req, res, next) {

    var body = "";

    req.on('data', Meteor.bindEnvironment(function(data) {

        body += data;

    }));

    req.on('end', Meteor.bindEnvironment(function() {

        var json = xml2js.parseStringSync(body, { trim: true, explicitArray: false, explicitRoot: false });

        if (json.result_code == "SUCCESS") {

            var pid = json.out_trade_no;
            var transid = json.transaction_id;
            var openid = json.openid;
            var mch_id = json.mch_id;
            var total_fee = json.total_fee / 100 * 20;
            var cash_fee = json.cash_fee / 100 * 20;

            //TODO something
        }
        res.end("success");
    }));

})
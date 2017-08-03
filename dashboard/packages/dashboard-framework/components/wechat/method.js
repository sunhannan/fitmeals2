Meteor.methods({
    signatureWechat: function(args) {
        var signobj = {
            jsapi_ticket: getTicket(),
            noncestr: CryptoJS.MD5(Math.random() + "").toString(),
            timestamp: Math.floor(Date.now() / 1000),
            url: process.env.ROOT_URL + args.path.replace("/", ""),
        }

        var signstr = json2query(signobj);

        signobj.signature = CryptoJS.SHA1(signstr).toString();
        signobj.appId = wechatConfig.appid;

        console.log(signobj);

        return signobj;
    },
});



getTicket = function() {
    var token = getWxToken();
    if (token) {
        var wt = wxticket.findOne({ expiresAt: { $gt: (Math.floor(Date.now() / 1000)) } });

        if (wt) {
            return wt.ticket;
        } else {
            var url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi';

            var response = Meteor.http.get(url);

            if (response.statusCode === 200) {
                wxticket.update({}, {
                    ticket: response.data.ticket,
                    expiresAt: Math.floor(Date.now() / 1000 + 7200)
                });
                return response.data.ticket;
            } else {
                console.log("ticket error");
                return false;
            }
        }
    }

}


Meteor.startup(function() {
    if (wxaccesstoken.find().count() == 0) {
        wxaccesstoken.insert({});
    }
    if (wxticket.find().count() == 0) {
        wxticket.insert({});
    }
});


WXPay = (function buildAPI() {
    return {
        //创建统一支付订单
        createUnifiedOrder: function(opts, fn) {
            //this.showConfig();
            var unifiedorderUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
            this.wxpayID = {
                appid: framework.wechat.appid,
                mch_id: framework.wechat.mchid,
                device_info: "WEB"
            }
            opts.nonce_str = opts.nonce_str || WxPayUtil.generateNonceString();
            _.extend(opts, this.wxpayID);
            opts.sign = this.sign(opts);
           
            var postXml = WxPayUtil.buildXML({ xml: opts });
            var response = Meteor.http.post(unifiedorderUrl, { content: postXml })
            if (response.statusCode === 200) {
                return WxPayUtil.parseXML(response.content);
            }
        },
        //根据微信订单号查询支付订单
        queryOrder: function(query, fn) {
            var wxUrl = "https://api.mch.weixin.qq.com/pay/orderquery";
            if (!(query.transaction_id || query.out_trade_no)) {
                fn(null, { return_code: 'FAIL', return_msg: '缺少参数' });
            }
            _.extend(query, this.wxpayID);
            query.sign = this.sign(query);
            var postXml = WxPayUtil.buildXML({ xml: query });
            var response = Meteor.http.post(wxUrl, { content: postXml })
            if (response.statusCode === 200) {
                return WxPayUtil.parseXML(response.content);
            }

        },
        //show config
        showConfig: function(content) {
            ////console.log("APP_ID",APP_ID);
            ////console.log("APP_SECRET",APP_SECRET);
            ////console.log("PARTNER_KEY",PARTNER_KEY);
            ////console.log("MCH_ID",MCH_ID);
        },
        //weixin sign
        sign: function(param) {
            var querystring = Object.keys(param).filter(function(key) {
                return param[key] !== undefined && param[key] !== '' && ['pfx', 'partner_key', 'sign', 'key'].indexOf(key) < 0;
            }).sort().map(function(key) {
                return key + '=' + param[key];
            }).join("&") + "&key=" + framework.wechat.partnerKey;
            //console.log("sign:");
            //console.log(querystring);
            var hash = CryptoJS.MD5(querystring).toString().toUpperCase();
            return hash
        }
    };
})();

WxPayUtil = {
    generateNonceString: function(length) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var maxPos = chars.length;
        var noceStr = "";
        for (var i = 0; i < (length || 32); i++) {
            noceStr += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return noceStr;
    },
    mix: function() {
        var root = arguments[0];
        if (arguments.length == 1) {
            return root;
        }
        for (var i = 1; i < arguments.length; i++) {
            for (var k in arguments[i]) {
                root[k] = arguments[i][k];
            }
        }
        return root;
    },
    encodeUTF8: function(str) {
        var temp = "",
            rs = "";
        for (var i = 0, len = str.length; i < len; i++) {
            temp = str.charCodeAt(i).toString(16);
            rs += "\\u" + new Array(5 - temp.length).join("0") + temp;
        }
        return rs;
    },
    buildXML: function(json) {

        var builder = new xml2js.Builder();
        return builder.buildObject(json);
    },
    parseXML: function(xml, fn) {
        // var parser = new xml2js.Parser({ trim: true, explicitArray: false, explicitRoot: false });
        return xml2js.parseStringSync(xml, { trim: true, explicitArray: false, explicitRoot: false });
    }

}

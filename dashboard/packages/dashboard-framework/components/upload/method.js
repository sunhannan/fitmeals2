Meteor.methods({
    "framework.ossSign": function() {

        var policyText = {
            "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
            "conditions": [
                ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
            ]
        };

        var policyBase64 = Base64.encode(JSON.stringify(policyText))
        message = policyBase64
        var bytes = Crypto.HMAC(Crypto.SHA1, message,framework.oss.accesskey, { asBytes: true });
   
        return {
            accessid: framework.oss.accessid,
            dir: framework.oss.dir,
            host: ("http://" + framework.oss.bucket + "." + framework.oss.region + ".aliyuncs.com"),
            cdn: framework.oss.cdn,
            signature:Crypto.util.bytesToBase64(bytes),
            policy:policyBase64
        };
    }

});

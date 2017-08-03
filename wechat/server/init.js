framework.oss.accessid = 'xxxxxx';
framework.oss.accesskey = 'xxxxxx';
framework.oss.dir = 'client';
framework.oss.bucket = 'code4';
framework.oss.region = 'oss-cn-beijing';
framework.oss.cdn = 'https://cdn.code4.cn';



framework.sms.uid = "xxxxxx";
framework.sms.code = "xxxxxx";
framework.sms.pwd = "xxxxxx";

if (Meteor.isProduction) {
    framework.wechat.appid = 'xxxxxx';
    framework.wechat.secret = 'xxxxxx';
    framework.wechat.developer = 'xxxxxx';
    framework.wechat.EncodingAESKey = 'xxxxxx';
    framework.wechat.mchid = 'xxxxxx';
    framework.wechat.partnerKey = 'xxxxxx';
} else {
    framework.wechat.appid = 'wx7a034c89e8da2624';
    framework.wechat.secret = 'babe84938c5d9bbeea90d6ecf7a64ed2';
    framework.wechat.developer = 'gh_c9dfdd9a3714';
    framework.wechat.mchid = 'xxxxxx';
    framework.wechat.partnerKey = 'xxxxxx';
}

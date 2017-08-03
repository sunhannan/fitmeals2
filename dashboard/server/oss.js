import request from 'request';
import fs from 'fs';
import path from 'path';
import OSS from 'aliyun-oss';
_to_oss = {
    temp: "",
    oss: "",
    init: function() {
        _to_oss.temp = path.resolve('./tmp');

        if (!fs.existsSync(_to_oss.temp)) {
            fs.mkdirSync(_to_oss.temp);
        }

        _to_oss.oss = OSS.createClient({
            accessKeyId: framework.oss.accessid,
            accessKeySecret: framework.oss.accesskey,
            host: (Meteor.isProduction ? (framework.oss.region + "-internal.aliyuncs.com") : (framework.oss.region + ".aliyuncs.com"))
        });

        console.log("OSS初始化完毕");

    },
    upload: function(wmid, thumb_url, cb) {
        console.log(wmid);
        console.log((_to_oss.temp + "/" + wmid));
        request(thumb_url, function() {
            _to_oss.oss.putObject({
                bucket: framework.oss.bucket,
                object: (framework.oss.dir + "/" + wmid),
                source: (_to_oss.temp + "/" + wmid)
            }, function(err, res) {
                fs.unlinkSync(_to_oss.temp + "/" + wmid);
                cb(framework.oss.cdn + "/" + framework.oss.dir + "/" + wmid);
            });
        }).pipe(fs.createWriteStream(_to_oss.temp + "/" + wmid));
    }
}
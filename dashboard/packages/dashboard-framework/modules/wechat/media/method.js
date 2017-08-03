import request from 'request';
import fs from 'fs';
import path from 'path';
import OSS from 'aliyun-oss';

Meteor.methods({
    "wxMedia.all": function(sel, pro) {

        var objs = WxMedia.find(sel, pro).fetch();

        for (var i = 0; i < objs.length; i++) {

            if (objs[i].category) {
                var ca = Category.findOne({ _id: objs[i].category });
                if (ca) {
                    objs[i].category_name = ca.name;
                }
            } else {
                objs[i].category_name = "未分类";
            }

        }
        return {
            rows: objs,
            total: WxMedia.find(sel, pro).count()
        };
    },
    "wxMedia.sync": function() {


        var mediaArr = [];

        var result = HTTP.get("https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=" + framework.wechat.token());

        // console.log(result);

        if ((result.statusCode == 200) && (result.content)) {


            var count = JSON.parse(result.content);

            // console.log(count);

            var total = count.news_count;

            var pages = total / 20 + 1;



            for (var i = 0; i < pages; i++) {

                var listResult = HTTP.post("https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=" + framework.wechat.token(), {
                    data: {
                        type: "news",
                        offset: (i * 20),
                        count: 20
                    }
                });



                if ((listResult.statusCode == 200) && (listResult.content)) {

                    var list = JSON.parse(listResult.content);


                    for (var j = 0; j < list.item.length; j++) {

                        var item = list.item[j];

                        var media_id = item.media_id;

                        if (item.content && item.content.news_item) {

                            var citems = item.content.news_item;

                            for (var x = 0; x < citems.length; x++) {

                                var citem = citems[x];
                                if (citem.thumb_url) {
                                    var obj = {
                                        "title": citem.title,
                                        "thumb_media_id": citem.thumb_media_id,
                                        "thumb_url": citem.thumb_url,
                                        "show_cover_pic": citem.show_cover_pic,
                                        "author": citem.author,
                                        "digest": citem.digest,
                                        "url": citem.url,
                                        "content_source_url": citem.content_source_url,
                                        "media_id": media_id,
                                        "first":(x == 0),
                                        "key": CryptoJS.MD5(media_id + citem.title).toString(),
                                        "position": x,
                                        "category": "",
                                        "status": true,
                                        "orderBy": 1000,
                                        "createdAt": new Date(),
                                    }
                                    mediaArr.push(obj);
                                }
                            }
                        }
                    }
                }
            }

        }

        var inc = 0;
        var update = 0;

        if (mediaArr.length > 0) {


            _to_oss.init();

            for (var i = 0; i < mediaArr.length; i++) {



                if (WxMedia.findOne({ key: mediaArr[i].key })) {

                    var wm = WxMedia.findOne({ key: mediaArr[i].key })
                    
                    WxMedia.update({_id:wm._id},{$set:mediaArr[i]});

                    var thumb = _to_oss.upload(wm._id, mediaArr[i].thumb_url);

                    WxMedia.update({ _id: wm._id }, { $set: { thumb: thumb } });
                    
                    update++;

                }else{

                    var wmid = WxMedia.insert(mediaArr[i]);

                    var thumb = _to_oss.upload(wmid, mediaArr[i].thumb_url);

                    WxMedia.update({ _id: wmid }, { $set: { thumb: thumb } });
                    
                    inc++;
                }
            }
        }

        return {
            total: mediaArr.length,
            inc: inc,
            update:update,
        };

    }
});
_to_oss = {
    temp: "",
    oss: "",
    init: function() {
        _to_oss.temp = path.resolve('./tmp');

        if (!fs.existsSync(_to_oss.temp)) {
            fs.mkdirSync(_to_oss.temp);
        }

        var OSS = require('aliyun-oss');

        _to_oss.oss = OSS.createClient({
            accessKeyId: framework.oss.accessid,
            accessKeySecret: framework.oss.accesskey,
            host: (Meteor.isProduction ? (framework.oss.region + "-internal.aliyuncs.com") : (framework.oss.region + ".aliyuncs.com"))
        });


    },
    upload: function(wmid, thumb_url) {
        request(thumb_url, function() {
            _to_oss.oss.putObject({
                bucket: framework.oss.bucket,
                object: (framework.oss.dir + "/" + wmid),
                source: (_to_oss.temp + "/" + wmid)
            }, function(err, res) {
               
                fs.unlinkSync(_to_oss.temp + "/" + wmid);
            });
        }).pipe(fs.createWriteStream(_to_oss.temp + "/" + wmid));
        return (framework.oss.cdn + "/" + framework.oss.dir + "/" + wmid);
    }
}

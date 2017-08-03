Template.upload.onCreated(function() {

});

Template.upload.helpers({
    props: function() {
        console.log(this);
    },
    acceptSelect: function() {
        return this.accept ? this.accept : ".jpg,.png,.JPG,.PNG,.jpeg";
    },
    objsIt: function() {

        if (this.objs) {
            // console.log(this.objs);
            if (typeof(this.objs) == "string") {
                return [this.objs];
            } else if (typeof(this.objs) == "object") {
                return this.objs;
            }
        }
        return [];
    }
});



Template.upload.events({
    "click .upload-thumb-item": function(event) {
        $(event.currentTarget).remove();
        Template.instance().$(".upload-btn").show();
    },
    "change .upload-btn-file": function(event) {
        var that = Template.instance();
        if (!that.data.multiple) {
            that.$(".upload-btn").hide();
        }
        var id = this.id;
        var target = event.currentTarget;
        var thumbs = $(target).parent().parent().find(".upload-thumbs");
        lrz(target.files[0], { width: 300 })
            .then(function(rst) {
                var picItem = $("<div></div>")
                    .addClass("upload-thumb-item")
                    .addClass("upload-thumb-item-ing")
                    .addClass("animated")
                    .addClass("bounceIn")
                    .css({ backgroundImage: "url(" + rst.base64 + ")" })
                    .attr("title", "点击取消")
                    .appendTo(thumbs).click(function() {
                        picItem.remove();
                        var src = picItem.attr("data-src");
                        if ($.inArray(src, _uploadObj[id])) {
                            var oarr = _uploadObj[id];
                            var narr = [];
                            for (var i = 0; i < oarr.length; i++) {
                                if (oarr[i] != src) {
                                    narr.push(oarr[i]);
                                }
                            }
                            _uploadObj[id] = narr;
                        }
                    });
                EXIF.getData(target.files[0], function() {

                    var exif = EXIF.getAllTags(this);
                    exif.userid = Meteor.userId();
                    var imgId = Images.insert(exif);

                    Meteor.call("framework.ossSign", function(err, res) {

                        var key = res.dir + "/" + imgId;
                        key = encodeURI(key, "UTF-8");


                        var request = new FormData();
                        request.append('OSSAccessKeyId', res.accessid);
                        request.append('policy', res.policy);
                        request.append('signature', res.signature);
                        request.append('key', key);
                        request.append('file', target.files[0]);
                        request.append('submit', "Upload to oss");

                        $.ajax({
                            url: res.host,
                            data: request,
                            processData: false,
                            async: false,
                            cache: false,
                            contentType: false,
                            //关键是要设置contentType 为false，不然发出的请求头 没有boundary
                            //该参数是让jQuery去判断contentType
                            type: "POST",
                            success: function(data, textStatus, request) {
                                var cdnUrl = res.cdn + "/" + res.dir + "/" + imgId;
                                picItem.removeClass("upload-thumb-item-ing")
                                    .attr("data-src", cdnUrl);
                                //.css({backgroundImage:"url(" + cdnUrl + "?x-oss-process=image/resize,m_lfit,w_120,limit_0/auto-orient,0/quality,q_52)"})
                                _uploadObj[id].push(res.cdn + "/" + res.dir + "/" + imgId);

                            },
                            error: function(XMLHttpRequest, textStatus, errorThrow) {
                                toastr.error("图片上传错误:" + rst.origin.imgId);
                                picItem.remove();
                                that.$(".upload-btn").show();
                            },

                        });



                    })
                })

            })
            .catch(function(err) {
                // 处理失败会执行
                toastr.error("图片上传错误", err);
                that.$(".upload-btn").show();

            })
            .always(function() {
                // 不管是成功失败，都会执行
            });
    }
});

_uploadObj = {};
uploader = {
    get: function(id) {

        if ($("#ut_" + id).attr("multiple") != "multiple") {

            var els = $("#ut_" + id).find(".upload-thumb-item");

            return els[0] ? els.attr("data-src") : "";

        } else {
            var imgs = [];
            var els = $("#ut_" + id).find(".upload-thumb-item");
            for (var i = 0; i < els.length; i++) {
                imgs.push($(els[i]).attr("data-src"));
            }
            return imgs;
        }

    },
    loaded: function() {
        return $(".upload-thumb-item-ing").size() == 0;
    }
}
Template.upload.onRendered(function() {
    var that = this;
    _uploadObj[this.data.id] = [];

    if (!Template.instance().data.multiple && Template.instance().data.objs ) {
        Template.instance().$(".upload-btn").hide();
    }

});

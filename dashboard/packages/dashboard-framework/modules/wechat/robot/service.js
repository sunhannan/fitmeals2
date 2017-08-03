// http://www.tuling123.com/openapi/api
_robot = {
    knowleage:function(content){
        var q = Knowledge.findOne({

            "q": { $regex: content, $options: 'i' }

        }, {
            sort: { orderBy: -1 ,hit:-1}
        });

        if(q){
            Knowledge.update({_id:q._id},{
                $inc:{hit:1}
            });
            return q.content;

        }
        return false;
    },
    ask: function(id, content) {

        var knowleage = _robot.knowleage(content);

        if(knowleage){
            return knowleage;
        }
        if(!framework.robot.key){
            return "";
        }
        var result = HTTP.post("http://www.tuling123.com/openapi/api", {
            data: {
                key: framework.robot.key,
                info: content,
                userid: id
            }
        });

        if ((result.statusCode == 200) && (result.content)) {

            var json = JSON.parse(result.content);

            var resp = json.text;

            var images = [];


            if (json.code == 100000) {
                //文本类
            } else if (json.code == 100000) {
                //链接类
            } else if (json.code == 302000) {
                //新闻类
            } else if (json.code == 308000) {
                //菜谱类
            }
            if (json.url) {
                resp += " 详情请查看 ： <a  href=' " + json.url + " '> " + json.url + " </a>";

            }
            if (json.icon) {
                images.push(json.icon);

            }
            if (json.list) {
                var arr = [];

                for (var i = 0; i < json.list.length; i++) {
                    var str = [];
                    var obj = json.list[i];
                    str.push(`<a  href='` + obj.detailurl + `'>`)
                    str.push(`</a>`);
                    arr.push(str.join(""));
                }
                resp += arr.join("");
            }

            return resp;

        } else {
            return "";
        }
    }
}

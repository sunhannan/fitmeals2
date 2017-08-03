Template.wxOthers.onCreated(function() {
    this.subscribe("config", "wechat.welcome");
    this.subscribe("config", "wechat.robot");
});


Template.wxOthers.helpers({
    welcome: function() {
        return Config.findOne({ key: "wechat.welcome" });
    },
    robot: function() {
        return Config.findOne({ key: "wechat.robot" });
    },
});
Template.wxOthers.events({
    'click #save': function() {
        console.log($("#robot").val() == 1 );
        var config = Config.findOne({ key: "wechat.welcome" });
        if (config) {
            Config.update({_id:config._id},{
                $set:{
                    value:$("#txt").val()
                }
            });
        }else{
             Config.insert({
                key: "wechat.welcome",
                value:$("#txt").val(),
                side:["client","server"]
             });
        }
        config = Config.findOne({ key: "wechat.robot" });
        if (config) {
            Config.update({_id:config._id},{
                $set:{
                    value:($("#robot").val() == 1 )
                }
            });
        }else{
             Config.insert({
                key: "wechat.robot",
                value:($("#robot").val() == 1 ),
                side:["client","server"]
             });
        }
        toastr.success("条目已更新");

    },

});

Template.wxOthers.onRendered(function() {

});

Template.config.onCreated(function() {
	
});
Template.config.helpers({
    option: function() {
        return {
         
            method: "queryAllconfig",
            fields: { },
             selector: function() {
                return {}
            },
            sort:{
                createdAt:-1
            },
            columns: [{
                title: "最后更新",
                width:140,
                data: "updatedAt"
            },{
                title: "KEY",
                width:120,
                data: "key"
            },{
                title: "VALUE",
                width:120,
                data: "value"
            },{
                title: "操作",
                width:120,
                render:function(row){
                    var arr = [];

                      arr.push("<a href='' onclick=\"_config.edit(\'" + row._id + "\')\" > 修改 </a> ");

                         arr.push("<a href='' onclick=\"_config.delete(\'" + row._id + "\')\" > 删除 </a> ");
                    return arr.join("|");
                }
            }],
        }
    }
});
Template.config.events({

});
Template.config.onRendered(function() {

});
_config = {
    edit:function(cid){
        popup.show(Template.configEdit,{cid:cid})
    },
    delete:function(cid){
        Config.remove(cid);
        grid.flash("config");
    }
}
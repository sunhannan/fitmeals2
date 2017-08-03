Template.category.onCreated(function() {

});
Template.category.helpers({
    isChildren: function() {
    	var obj = grid.param("category");

        return "?parent=" + (obj ? obj.selector.parent : "root");
    },
    isNotRoot:function(){
        var obj = grid.param("category");
        return !(obj && (obj.selector.parent == "root")) ;
    },
    option: function() {
        return {
            method: "queryAllCategory",
            // collection: "users",
            selector: function() {
                return {
                    status:true,
                    parent: FlowRouter.getQueryParam("parent") ? FlowRouter.getQueryParam("parent") : "root",

                }
            },
            fields: { type: 1 },
            columns: [{
                title: "地区",
                data: "name"
            }, {
                title: "类型",
                width: 150,
                render: function(row) {

                    var ct = CategoryType.findOne({key:row.type});
                    return ct ? ct.name : "";
                },
            },{
                title: "操作",
                width: 200,
                render: function(row) {

                    var arr = [];

                    if (Roles.userIsInRole(Meteor.userId(), ['admin'], "dashboard")) {

                        arr.push("<a href='' onclick=\"_category.delete(\'" + row._id + "\')\" > 删除 </a> ");

                        arr.push("<a href='/category/edit?id=" + row._id + "'> 修改</a> ");

                        var obj = grid.param("category");
                      
                        if (obj && obj.selector.parent == "root") {
                            arr.push("<a href='' onclick=\"_category.children(\'" + row._id + "\')\" > 子分类 </a>");
                        }

                        var ct = CategoryType.findOne({key:row.type});

                        if(ct && ct.view){
                            var url = ct.view;
                            for(var platform in framework.client){
                                url = url.replace("["+platform+"]",framework.client[platform]);
                            }
                            url = url.replace("[id]",row._id);
                            
                            arr.push("<a href='' onclick=\"qrcode.show(\'" + url + "\')\" > 预览 </a>");
                        }

                    }
                    return arr.join("|");
                },
            }],
        }
    }
});
Template.category.events({

});
Template.category.onRendered(function() {

});
_category = {
    delete: function(id) {
        if (confirm("确认删除这条数据")) {
            Category.update({_id:id},{$set:{status:false}});
            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "category.delete",
                link: id
            });
            grid.flash("category");
        }
    },
    children:function(id){
    	grid.reload("category",{
                    parent: id,
                    status:true,
                });
    }
}

Template.adminMember.onCreated(function() {});
Template.adminMember.helpers({
    option: function() {
        return {
            method: "queryAllMembers",
            // collection: "users",
            selector:function(){
                return {
                    type:"dashboard",
                }
            },
            fields: { profile: 1, emails: 1, roles: 1 },
            columns: [{
                title: "注册邮箱",
                render: function(row) {
                    return row.emails ? row.emails[0].address : "";
                },
            }, {
                title: "用户姓名",
                render: function(row) {
                    return (row.profile && row.profile.nickname) ? row.profile.nickname : "-";
                },
            }, {
                title: "联系方式",
                render: function(row) {
                    return (row.profile && row.profile.tel) ? row.profile.tel : "-";
                },
            }, {
                title: "注册时间",
                data: "createdAt",
            }, {
                title: "权限",
                render: function(row) {
                    var nr = [];
                    var roles = row.roles["dashboard"];
                    if (roles) {
                        for (var i = 0; i < roles.length; i++) {
                            var cr = ClientRoles.findOne({key:roles[i]});
                            if(cr){
                                nr.push(cr.name);
                            }
                            
                        }
                    }else if(row && row.emails && row.emails[0] && (row.emails[0].address == "admin@fami2u.com")){
                        nr.push("系统管理员");
                    }
                    return nr.join(",");
                },
            }, {
                title: "操作",
                render: function(row) {
                    var arr = [];
                    if (Roles.userIsInRole(Meteor.userId(), ['admin'], "dashboard")) {
                        arr.push("<a href='/members/detail?id=" + row._id + "'> 修改</a>");
                        arr.push("<a href='/members/auth?id=" + row._id + "'> 权限</a>");
                    }
                    return arr.join("");
                },
            }],
        }
    }
});
Template.adminMember.events({
    "click #filter": function() {
        grid.reload("members", { level: "6" });
    }
});
Template.adminMember.onRendered(function() {});

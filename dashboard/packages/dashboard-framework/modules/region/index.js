Template.region.onCreated(function() {
    // this.subscribe("regionAll");
});
Template.region.helpers({
    level1: function() {
        return Session.get("region_level_1");
    },
    level2: function() {
        return Session.get("region_level_2");
    },
    level3: function() {
        return Session.get("region_level_3");
    },
    isChildren: function() {
        var obj = grid.param("region");

        return "?parent=" + (obj ? obj.selector.parent : "root");
    },
    isNotRoot: function() {
        var obj = grid.param("region");
        return !(obj && (obj.selector.parent == "root"));
    },
    option: function() {
        return {
            method: "queryAllRegion",
            // collection: "users",
            selector: function() {
                return {
                    parent: FlowRouter.getQueryParam("parent") ? FlowRouter.getQueryParam("parent") : "root",
                }
            },
            fields: {},
            columns: [{
                title: "地区",
                data: "name"
            }, {
                title: "操作",
                width: 100,
                render: function(row) {

                    var arr = [];

                    if (Roles.userIsInRole(Meteor.userId(), ['admin'], "dashboard")) {

                        arr.push("<a href='' onclick=\"_region.delete(\'" + row._id + "\')\" > 删除 </a> ");

                        arr.push("<a href='/region/edit?id=" + row._id + "'> 修改</a> ");

                        var obj = grid.param("region");

                        arr.push("<a href='' onclick=\"_region.children(\'" + row._id + "\')\" > 子区域 </a>");

                    }
                    return arr.join("|");
                },
            }],
        }
    }
});
Template.region.events({
    "click .region-select-1": function(event) {
        var target = $(event.currentTarget);
        $(".region_active_1").removeClass("region_active_1").removeClass("active");
        target.addClass("active").addClass("region_active_1");
        Meteor.call("regionByParent", this._id, function(err, res) {
            Session.set("region_level_2", res)
            Session.set("region_level_3", []);
        })

    },
    "click .region-select-2": function(event) {

        var target = $(event.currentTarget);

        $(".region_active_2").removeClass("region_active_2").removeClass("active");

        target.addClass("active").addClass("region_active_2");

        Meteor.call("regionByParent", this._id, function(err, res) {
            Session.set("region_level_3", res)
        })

    },
    "click .region-select-3": function(event) {

        var target = $(event.currentTarget);

        $(".region_active_3").removeClass("region_active_3").removeClass("active");

        target.addClass("active").addClass("region_active_3");


    }
});
Template.region.onRendered(function() {
    if (!Session.get("region_level_1")) {
        _region.load_1();
    }

});
_region = {
    load_1: function() {
        Meteor.call("regionByParent", "root", function(err, res) {
            Session.set("region_level_1", res)
        })
    },
    delete: function(id) {
        if (confirm("确认删除这条数据")) {
            Region.remove(id);
            AdminTrack.insert({
                userId: Meteor.userId(),
                createdAt: new Date(),
                action: "region.delete",
                link: id
            });
            grid.flash("region");
        }
    },
    children: function(id) {
        grid.reload("region", {
            parent: id,
        });
    }
}

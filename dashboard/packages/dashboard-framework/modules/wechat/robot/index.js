Template.robot.onCreated(function() {
    // this.subscribe("robotBase",{onReady:function(){}});
});
Template.robot.helpers({
    option: function() {
        return {
            method: "queryAllKnowledge",
            fields: { q: 1 },
            selector: function() {
                return {}
            },
            columns: [{
                title: "关键词",
                render: function(row) {
                    return row.q.join(" ");
                }
            }, {
                title: "排序",
                data: "orderBy"
            }, {
                title: "命中",
                data: "hit"
            }, {
                title: "操作",
                width: 240,
                render: function(row) {

                    var arr = [];

                    arr.push("<a href='' onclick=\"_robot.delete(\'" + row._id + "\')\" > 删除 </a> ");

                    arr.push("<a href='/robot/edit?id=" + row._id + "'> 修改</a> ");

                    return arr.join("|");
                },
            }],
        }
    }
});
Template.robot.events({

});
Template.robot.onRendered(function() {

});
_robot = {
    delete: function(id) {
        if (confirm("确认删除这条数据")) {
            Knowledge.remove({ _id: id});
            grid.flash("robot");
        }
    },
}


Meteor.methods({
     queryAllconfig: function(sel, pro) {
        var objs = Config.find(sel, pro).fetch();

        var arr = [];
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            arr.push(obj);
        }

        return {
            rows: arr,
            total: Config.find(sel, pro).count()
        };
    },
});


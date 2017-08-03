Template.grid.helpers({
    result: function() {
        return Session.get("DATA_" + Template.currentData().id) ? Session.get("DATA_" + Template.currentData().id) : { rows: [], total: 0 };
    },
    rows: function() {
        return Session.get("DATA_" + Template.currentData().id) ? Session.get("DATA_" + Template.currentData().id).rows : [];
    },
    cell: function(data, column) {

        //设置data的情况
        if (column.data) {
            var obj = data[column.data];

            //“.”的处理

            if(column.data.indexOf(".")){
                var keyArr = column.data.split(".");
                var tmpData = data;
                for(var i = 0 ; i < keyArr.length ; i++){
                    tmpData = tmpData ? tmpData[keyArr[i]] : undefined;
                }
                obj = tmpData;
            }

            if (typeof obj == "undefined" || obj == null) {
                return "-";
            } else if (typeof obj.getMonth == "function") {
                return moment(obj).format(column.format ? column.format : "YYYY/MM/DD HH:mm");
            } else if (column.type == "decimal") {
                return obj.toFixed(2);
            } else if (column.type == "money") {
                return "¥ " + obj.toFixed(2);
            } else if (column.type == "image") {
                return "<img height='60px' src='" +obj+ "'/>";
            } else if (column.select) {
                return column.select[obj + ""];
            } else {
                return obj;
            }
        } else if (column.render) {
            return column.render(data);
        }
    },
    current: function() {
        if (Session.get(Template.currentData().id)) {
            var obj = Session.get(Template.currentData().id).projection;

            return Math.ceil((obj.skip + 1) / obj.limit);
        } else {
            return 0;
        }
    },
    total: function() {
        if (Session.get(Template.currentData().id) && Session.get("DATA_" + Template.currentData().id)) {
            var obj = Session.get(Template.currentData().id).projection;
            var result = Session.get("DATA_" + Template.currentData().id);
            return Math.ceil(result.total / obj.limit);
        } else {
            return 0;
        }
    },
    pages: function() {
        var pages = [];

        if (Session.get(Template.currentData().id) && Session.get("DATA_" + Template.currentData().id)) {

            var obj = Session.get(Template.currentData().id).projection;
            var cur = Math.ceil((obj.skip + 1) / obj.limit);

            var result = Session.get("DATA_" + Template.currentData().id);
            var total = Math.ceil(result.total / obj.limit);

            for (var i = (cur - 3); (i <= total && pages.length < 7 ); i++) {
                if (i > 0) {
                    pages.push(i)
                }
            }

            // if(pages[pages.length - 1] < total){
            //     pages.push(total);
            // }
        }

        return pages;
    },
    footerColspan: function() {
        // return this.option.columns ? (this.option.columns.length - 1) : 0;
        return this.option.columns.length;
    },
    checkWidth:function(column){
        return column.width ? column.width : "auto";
    },
    needFoot:function(){
        return !Template.currentData().nofoot;
    }
});
Template.grid.events({
    "click .xwuGrid-right": function(event) {
        var obj = $(event.currentTarget);
        var obj = Session.get(Template.currentData().id);
        obj.projection.skip = obj.projection.skip + obj.projection.limit;
        Session.set(Template.currentData().id, obj);
    },
    "click .xwuGrid-left": function(event) {
        var obj = $(event.currentTarget);
        var obj = Session.get(this.id);
        obj.projection.skip = obj.projection.skip - obj.projection.limit;
        Session.set(Template.currentData().id, obj);
    },
    "click .xwuGrid-item": function(event) {
        var target = $(event.currentTarget);
        var obj = Session.get(Template.currentData().id);
        obj.projection.skip = (target.attr("data-for") * 1 - 1) * obj.projection.limit;
        Session.set(Template.currentData().id, obj);
    },
    "click .sort-th": function() {
        var obj = Session.get(Template.currentData().id);

        if (this.data) {
            if (!obj.projection.sort) {
                obj.projection.sort = {};
            }

            if ((typeof obj.projection.sort[this.data] == "undefined") || (obj.projection.sort[this.data] == -1)) {
                obj.projection.sort = {};
                obj.projection.sort[this.data] = 1;
            } else {
                obj.projection.sort = {};
                obj.projection.sort[this.data] = -1;
            }
            Session.set(Template.currentData().id, obj);
        }
    }
});
Template.grid.onCreated(function() {

    if (!this.data.option.fields) {
        this.data.option.fields = {};
    }

    if (!this.data.option.selector) {
        this.data.option.selector = function() {
            return {}
        };
    }

    if (!this.data.option.sort) {
        this.data.option.sort = {};
    }

    var that = this;

    var option = that.data.option;
    var fields = that.data.option.fields;
    var selector = that.data.option.selector;
    var sort = that.data.option.sort;
    var skip = 0;
    var limit = that.data.option.limit ? that.data.option.limit : 50;

    for (var i = 0; i < option.columns.length; i++) {
        if (option.columns[i].data) {
            fields[option.columns[i].data] = 1;
        }
    }


    Session.set(that.data.id, {
        time: new Date().getTime(),
        projection: {
            skip: skip,
            limit: limit,
            fields: fields,
            sort: sort
        },
        selector: selector(),
    });

    Tracker.autorun(function() {
        var obj = Session.get(that.data.id);
        if (option.collection) {
            Meteor.call("gridFromCollection", option.collection, obj.selector, obj.projection, function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    Session.set("DATA_" + that.data.id, res);
                }
            });
        } else {
           
            Meteor.call(option.method, obj.selector, obj.projection, function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    Session.set("DATA_" + that.data.id, res);
                }
            });
        }

    });

});
grid = {
    flash: function(id,toBegin) {
        var obj = Session.get(id);

        obj.time = new Date().getTime();

        if(toBegin){
            obj.projection.skip = 0;
        }
        Session.set(id, obj);
    },
    reload: function(id, sel) {
        var obj = Session.get(id);
        obj.selector = sel;
        obj.projection.skip = 0;
        Session.set(id, obj);
    },
    data: function(id) {
        return Session.get("DATA_" + id);
    },
    param: function(id) {
        return Session.get(id);
    }
}

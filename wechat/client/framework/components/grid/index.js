Template.XwuGrid.helpers({
	result:function(){
		return Session.get("DATA_" + Template.currentData().id) ? Session.get("DATA_" + Template.currentData().id):{rows:[],total:0};
	},
    rows: function() {
        return Session.get("DATA_" + Template.currentData().id) ? Session.get("DATA_" + Template.currentData().id).rows : [];
    },
    cell: function(data, column) {
        //设置data的情况
        if (column.data) {
            var obj = data[column.data];
            if (typeof obj == "undefined") {
                return "-";
            } else if (typeof obj.getMonth == "function") {
                return moment(obj).format(column.format ? column.format : "YYYY/MM/DD HH:mm");
            } else {
                return obj;
            }
        }else if(column.render){
        	return column.render(data);
        }
    },
    current: function() {
    	if(Session.get(Template.currentData().id)){
    		var obj = Session.get(Template.currentData().id).projection;
    		
    		return Math.ceil((obj.skip + 1) / obj.limit);
    	}else{
    		return 0;
    	}
    },
    total: function() {
    	if(Session.get(Template.currentData().id) && Session.get("DATA_" + Template.currentData().id)){
    		var obj = Session.get(Template.currentData().id).projection;
    		var result = Session.get("DATA_" + Template.currentData().id);
    		return Math.ceil(result.total / obj.limit);
    	}else{
    		return 0;
    	}
    },
    pages: function() {
        var pages = [];
     
        if(Session.get(Template.currentData().id) && Session.get("DATA_" + Template.currentData().id)){

        	var obj = Session.get(Template.currentData().id).projection;
    		var cur = Math.ceil((obj.skip + 1) / obj.limit);

    		var result = Session.get("DATA_" + Template.currentData().id);
    		var total = Math.ceil(result.total / obj.limit);

    		 for (var i = (cur - 3); i <= total; i++) {
                if (i > 0) {
                    pages.push(i)
                }
            }
    	}

        return pages;
    }
});
Template.XwuGrid.events({
    "click .xwuGrid-right": function(event) {
        var obj = $(event.currentTarget);
        var obj = Session.get(Template.currentData().id);
        obj.projection.skip = obj.projection.skip + obj.projection.limit;
        Session.set(Template.currentData().id,obj);
    },
    "click .xwuGrid-left": function(event) {
        var obj = $(event.currentTarget);
        var obj = Session.get(this.id);
        obj.projection.skip = obj.projection.skip - obj.projection.limit;
        Session.set(Template.currentData().id,obj);
    },
    "click .xwuGrid-item": function(event){
    	var obj = $(event.currentTarget);
    	var obj = Session.get(Template.currentData().id);
        obj.projection.skip = (this - 1)*obj.projection.limit;
        Session.set(Template.currentData().id,obj);
    }
});
Template.XwuGrid.onCreated(function() {

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
    var sort = that.data.sort;
    var skip = 0;
    var limit = 2;

    for (var i = 0; i < option.columns.length; i++) {
        if (option.columns[i].data) {
            fields[option.columns[i].data] = 1;
        }
    }


    Session.set(that.data.id, {
        time: new Date(),
        projection: {
            skip: skip,
            limit: limit,
            fields: fields,
            sort: sort
        },
        selector: selector(),
    });

    Tracker.autorun(function() {
        Meteor.call(option.method, Session.get(that.data.id), function(err, res) {
        	
            Session.set("DATA_" + that.data.id, res);
        });
    });

});

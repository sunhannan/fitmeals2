Template.thumbStream.onCreated(function() {
    this.subscribe("streamByIdSimple",this.data._id);
});
Template.thumbStream.helpers({
    stream: function() {
    	return Streams.findOne(this._id);
    },
    arrb: function(arr) {
        var narr = [];
        if (arr) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    narr.push("<b>" + arr[i] + "</b>");
                }

            }
        }
        return narr.join(" ");
    }
});
Template.thumbStream.events({
    "click .thumbStream-item": function(arr) {
        Session.set("streamViewByKey", this.key);
    }
});
Template.thumbStream.onRendered(function() {
});

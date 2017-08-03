Meteor.publishComposite('regionById', function(id) {
    var uid = this.userId;
    return {
        find: function() {
            return Region.find({_id:id}, {});
        }
    }
});
Meteor.publishComposite('regionAll', function() {
    var uid = this.userId;
    return {
        find: function() {
            return Region.find({}, {});
        }
    }
});

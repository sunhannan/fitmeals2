Meteor.publishComposite('categoryById', function(id) {
    var uid = this.userId;
    return {
        find: function() {
            return Category.find({_id:id}, {});
        }
    }
});
Meteor.publishComposite('categoryByType', function(type) {
    var uid = this.userId;
    return {
        find: function() {
            return Category.find({type:type}, {});
        }
    }
});
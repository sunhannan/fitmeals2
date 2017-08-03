Meteor.publishComposite('knowledgeById', function(id) {
    return {
        find: function() {
            return Knowledge.find({_id:id}, {});
        }
    }
});
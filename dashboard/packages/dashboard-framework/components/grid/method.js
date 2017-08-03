Meteor.methods({
    gridFromCollection: function(col, sel, pro) {
        var collection = Meteor.Collection.get(col);
      
        return {
            rows: collection.find(sel, pro).fetch(),
            total: collection.find(sel, pro).count()
        };
    },
});

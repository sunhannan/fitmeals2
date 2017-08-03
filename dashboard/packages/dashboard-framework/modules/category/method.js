Meteor.methods({
    queryAllCategory: function(sel, pro) {
    	// console.log(sel);
        return {
            rows: Category.find(sel, pro).fetch(),
            total: Category.find(sel, pro).count()
        };
    }
});
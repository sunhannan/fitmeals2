Meteor.methods({
    queryAllRegion: function(sel, pro) {
        return {
            rows: Region.find(sel, pro).fetch(),
            total: Region.find(sel, pro).count()
        };
    },
    regionByParent: function(args) {
    	return Region.find({parent:args}).fetch();
    }
});

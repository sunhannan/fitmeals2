Meteor.methods({
    regionByIds: function(ids) {
       return _region_server.name(ids);
    }
});
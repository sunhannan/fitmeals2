Meteor.startup(function() {
    if (!Region.findOne()) {
        for (var i = 0; i < _region_data.length; i++) {
            var l1 = Region.insert({ name: _region_data[i].n, parent: "root" });
            if (_region_data[i].c) {
                for (var j = 0; j < _region_data[i].c.length; j++) {
                    var l2 = Region.insert({ name: _region_data[i].c[j].n, parent: l1 });
                    if (_region_data[i].c[j].c) {
                    	 for (var x = 0; x < _region_data[i].c[j].c.length; x++) {
                    	 	var l3 = Region.insert({ name: _region_data[i].c[j].c[x].n, parent: l2 });
                    	 }
                    }
                }
            }
        }
        console.log("地区信息已初始化");
    }
});

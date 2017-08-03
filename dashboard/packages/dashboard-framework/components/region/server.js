_region_server = {
    name: function(arr) {
        if (arr) {
            var regions = Region.find({ _id: { $in: arr } }).fetch();

            if (regions) {
                var regArr = [];
                for (var i = 0; i < regions.length; i++) {
                    regArr.push(regions[i].name);
                }
                return region_name = regArr.reverse().join(" ");
            }
        }
        return "";
    }
}

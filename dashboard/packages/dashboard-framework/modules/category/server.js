_category_server = {
    name: function(_id) {
        if (_id) {
            var obj = Category.findOne({ _id: _id});

            if (obj) {
                return obj.name;
            }
        }
        return "";
    }
}

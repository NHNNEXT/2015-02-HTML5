module.exports = TodosModel = {
    create: function(contents) {
        var todo = {
            contents: contents,
            state: "active"
        };
        return todo;   
    }
}
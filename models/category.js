const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, required: true, minLength: 3},
    description: {type: String},
    url: {type: String},
});

CategorySchema.virtual("catUrl").get(function() {
    return `/catalog/category/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
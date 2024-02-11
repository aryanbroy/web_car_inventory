const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    item_name: {type: String, required: true, minLength: 2},
    item_desc: {type: String},
    item_category: [{type: Schema.Types.ObjectId, ref: "Category"}],
    price: {type: Number, required: true},
    number_in_stock: {type: Number, required: true},
    item_url: {type: String, required: true},
});

ItemSchema.virtual("itemUrl").get(function() {
    return `/catalog/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
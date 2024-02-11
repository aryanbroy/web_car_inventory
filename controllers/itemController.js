const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const {body, validationResult} = require('express-validator');


exports.item_list = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find({}).sort({item_name: 1}).exec();
    res.render("item_list", {
        title: "Cars List",
        allItems: allItems,
    })
});

exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("item_category").exec();
    res.render("item_detail", {
        title: "Car Detail",
        item: item,
    })
});

exports.item_create_get =  asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}, "name").exec();
    res.render("item_form",{
        title: "Add Cars",
        allCategories: allCategories,
    })
});

exports.item_create_post =  [
    (req, res, next) => {
        if(!Array.isArray(req.body.item_category)){
            req.body.item_category = typeof req.body.item_category === "undefined" ? [] : [req.body.item_category];
        }
        next();
    },

    body("item_name", "Name cannot be empty").trim().isLength({min: 1}).escape(),
    body("item_desc", "Description cannot be empty").trim().isLength({min: 1}).escape(),
    body("item_category").escape(),
    body("price", "Price cannot be empty").trim().isLength({min: 1}).escape(),
    body("number_in_stock").trim().escape(),
    body("item_url", "Item url cannot be empty").trim().isLength({min: 1}).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const item = new Item({
            item_name: req.body.item_name,
            item_desc: req.body.item_desc,
            item_category: req.body.item_category,
            price: req.body.price,
            number_in_stock: req.body.number_in_stock,
            item_url: req.body.item_url
        });

        if(!errors.isEmpty()){
            const allCategories = await Category.find({}, "name").exec();

            res.render("item_form", {
                title: "Add Cars",
                allCategories: allCategories,
                item: item,
                errors: errors.array()
            });
        } else {
            await item.save();
            res.redirect(item.itemUrl)
        }
    })
    
]

exports.item_delete_get =  asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id);
    res.render("item_delete", {
        title: "Delete Car",
        item: item,
    })
});

exports.item_delete_post =  asyncHandler(async (req, res, next) => {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/catalog/items");
});

exports.item_update_get =  asyncHandler(async (req, res, next) => {
    // const item = await Item.findById(req.params.id).populate("item_category").exec();
    const [item, allCategories] = await Promise.all([
        Item.findById(req.params.id).populate("item_category").exec(),
        Category.find({}, "name").exec()
    ]);
    res.render("item_form", {
        title: "Update Car",
        item: item,
        allCategories: allCategories,
    })
});

exports.item_update_post =  [
    (req, res, next) => {
        if(!Array.isArray(req.body.item_category)){
            req.body.item_category = typeof req.body.item_category === "undefined" ? [] : [req.body.item_category];
        }
        next();
    },

    body("item_name", "Name cannot be empty").trim().isLength({min: 1}).escape(),
    body("item_desc", "Description cannot be empty").trim().isLength({min: 1}).escape(),
    body("item_category").escape(),
    body("price", "Price cannot be empty").trim().isLength({min: 1}).escape(),
    body("number_in_stock").trim().escape(),
    body("item_url", "Item url cannot be empty").trim().isLength({min: 1}).escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const item = new Item({
            item_name: req.body.item_name,
            item_desc: req.body.item_desc,
            item_category: req.body.item_category,
            price: req.body.price,
            number_in_stock: req.body.number_in_stock,
            item_url: req.body.item_url,
            _id: req.params.id
        });

        if(!errors.isEmpty()){
            const allCategories = await Category.find({}, "name").exec();

            res.render("item_form", {
                title: "Add Cars",
                allCategories: allCategories,
                item: item,
                errors: errors.array()
            });
        } else {
            const updatedItem = await Item.findByIdAndUpdate(req.params.id, item);
            res.redirect(updatedItem.itemUrl);
        }
    })
]
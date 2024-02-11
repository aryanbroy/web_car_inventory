const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const {body, validationResult} = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
    const [numCategory, numItems] = await Promise.all([
        Category.countDocuments({}).exec(),
        Item.countDocuments({}).exec()
    ]);
    
    res.render("homepage", {
        title: "Homepage",
        numCategory: numCategory,
        numItems: numItems,
    })
})

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find({}).sort({name: 1}).exec();
    res.render("category_list", {
        title: "Category List",
        allCategories: allCategories,
    })
});

exports.category_detail = asyncHandler(async (req, res, next) => {
    const [category, items] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({item_category: req.params.id}).exec()
    ]);
    res.render("category_detail", {
        title: "Category detail",
        category: category,
        items: items,
    })
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.render("category_form", {
        title: "Add Category",
    })
});

exports.category_create_post = [
    body("name", "Name must contain at least 2 characters").trim().isLength({min: 2}).escape(),
    body("description", "Description must contain at least 3 characters").trim().isLength({min: 3}).escape(),
    body("url").trim().escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
        });

        if(!errors.isEmpty()){
            res.render("category_form", {
                title: "Add Category",
                category: category,
                errors: errors.array(),
            });
            return;
        } else {
            const categoryExists = await Category.findOne({name: req.body.name}).exec();
            if(categoryExists){
                res.redirect(categoryExists.catUrl);
            } else {
                await category.save();
                res.redirect(category.catUrl);
            }
        }
    })
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    const [category, items] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({item_category: req.params.id}).exec()
    ]);
    console.log(items.length)
    res.render("category_delete", {
        title: "Delete category",
        category: category,
        items: items
    })
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/catalog/categories");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    res.render("category_form", {
        title: "Update Category",
        category: category,
    })
});

exports.category_update_post = [
    body("name", "Name must contain at least 2 characters").trim().isLength({min: 2}).escape(),
    body("description", "Description must contain at least 3 characters").trim().isLength({min: 3}).escape(),
    body("url").trim().escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            _id: req.params.id,
        });

        if(!errors.isEmpty()){
            res.render("category_form", {
                title: "Add Category",
                category: category,
                errors: errors.array(),
            });
            return;
        } else {
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category);
            res.redirect(updatedCategory.catUrl);
        }
    })
]
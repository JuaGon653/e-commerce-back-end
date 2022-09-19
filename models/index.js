// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Category.hasMany(Product, {
  foreignKey: 'category_id',
});
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

Product.belongsToMany(Tag, {
  through: ProductTag
});
Tag.belongsToMany(Product, {
  through: ProductTag
});

// Categories have many Products

// Products belongToMany Tags (through ProductTag)


// Tag.hasOne(ProductTag, {
//   foreignKey: 'tag_id'
// });
// ProductTag.belongsTo(Tag, {
//   foreignKey: 'tag_id'
// });



// Tags belongToMany Products (through ProductTag)


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

const router = require('express').Router();
const { Category, Product } = require('../../models');
const { beforeBulkDestroy } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const userData = await Category.findAll({
      include: [{ model: Product}]
    });
    if (!userData) {
      res.status(400).json({ message: 'No data found.'});
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catData = await Category.findAll({
      include: [{ model: Product}],
      where: {id:req.params.id}
    });
    if (catData.length == 0) {
      res.status(400).json({ message: 'No data found with the given ID.'});
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
    try {
      const updatedCat = await Category.update(
        {
          category_name: req.body.category_name
        },
        {
          where: {
            id: req.params.id
          }
        }
      );

      if(!updatedCat[0]) {
        res.status(404).json({ message: 'No category with this id or given name is already set!'});
        return;
      }
      res.status(200).json(updatedCat);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deletedCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

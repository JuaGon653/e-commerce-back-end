const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  
  try {
    // find all categories and include its associated Products
    const userData = await Category.findAll({
      include: [{ model: Product}]
    });
    // if no user data, return an error message
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
  
  try {
    // find one category by its `id` value be sure to include its associated Products
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    // if category data, return an error message
    if (!catData) {
      res.status(400).json({ message: 'No data found with the given ID.'});
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  
  try {
    // create a new category with given body
    const catData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  
    try {
      // update a category by its `id` value
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
      // if no update category is returned, return an error message
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
  
  try {
    // delete a category by its `id` value
    const deletedCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    // if nothing was deleted, return an error message
    if (!deletedCat) {
      res.status(404).json({ message: 'No Category found with that id!'});
      return;
    }

    res.status(200).json(deletedCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

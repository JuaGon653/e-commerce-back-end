const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  
  try {
    // find all tags include its associated Product data
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    // if no tag data is found, return an error message
    if (!tagData) {
      res.status(400).json({ message: 'No data found.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  
  try {
    // find a single tag by its `id` include its associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    // if no tag data is found, return an error
    if(!tagData) {
      res.status(400).json({ message: 'No data found with the given ID.' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  
  try {
    // create a new tag
    const tagData = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  
  try {
    // update a tag's name by its `id` value
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    // if no updated tag data, return an error message
    if (!updatedTag[0]) {
      res.status(404).json({ message: 'No Tag with this id or given name is already set!' });
    }

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  
  try {
    // delete on tag by its `id` value
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    // if no deleted tag, return an error message
    if(!deletedTag) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

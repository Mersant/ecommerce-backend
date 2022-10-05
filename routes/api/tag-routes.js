const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product, 
        through: ProductTag
      } 
  ]})
  .then((dbTagData) => res.status(200).json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product, 
        through: ProductTag
      } 
  ]})
  .then((dbTagData) => res.status(200).json(dbTagData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.findOne({
    where: {
      id: req.params.id
    },
  })
    .then(dbTagData => {
      // Ensure there is a matching category for the given id
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }

      dbTagData.update({
        tag_name: req.body.tag_name
      });
      res.status(200).json(dbTagData);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    },
  })
    .then(tag => res.status(200).json(tag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

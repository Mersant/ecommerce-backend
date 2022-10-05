const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => { 
  // find all categories
  // be sure to include its associated Products
  Category.findAll()
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => { 
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }

      Product.findAll({
        where: {
          category_id: req.params.id
        }
      }).then(dbProductData => {
        res.json({dbCategoryData, dbProductData});
      })

    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', async (req, res) => { 
  // create a new category
  try {
      const category = await Category.create({
          category_name: req.body.category_name,
      })
      res.status(200).json(category);
  } catch (err) {
      console.log(err);
      res.status(404).json(err);
  }

});

router.put('/:id', (req, res) => { 
  // update a category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
  })
    .then(dbCategoryData => {
      // Ensure there is a matching category for the given id
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }

      dbCategoryData.update({
        category_name: req.body.category_name
      });
      res.status(200).json(dbCategoryData);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    },
  })
    // Return empty array if operation was succesful
    .then(dbCategoryData => res.status(200).json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

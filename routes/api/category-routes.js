const router = require('express').Router();
const { Category, Product } = require('../../models');
const { beforeBulkDestroy } = require('../../models/Product');

// The `/api/categories` endpoint




router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
    include: [{model: Product}],
    })

  res.status(200).json(categoryData)
} catch(err) {
  res.status(500).json(err);
}
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  
  try {
    const categoryDataById = await Category.findByPk(req.params.id, {
        include: [{model: Product}],
      });
  
      if (!categoryDataById) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      }
  
      res.status(200).json(categoryDataById);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.post('/', async (req, res) => {
    console.log(`hello`)
    // create a new category
    try {
  
    const newCategory = await Category.create(req.body)
    console.log(newCategory)
    res.status(200).json(newCategory);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const id = req.params.id
    const body= req.body
   await Category.update(body, { where:{ id } })
   const updatedCategory = await Category.findByPk(req.params.id, {
     include:[{model: Product}]
   })
      
    res.status(200).json(updatedCategory)
  
  } catch(error) {
    res.status(500).json(error)
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const id = req.params.id
    const deletedCategoryData = await Category.destroy({ where:{ id } })
    res.json(deletedCategoryData)
  } catch(error) {
    res.status(500).json(error)
}
})


module.exports = router;

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product}],
      })
  
    res.status(200).json(tagData)

  } catch (err) {
    res.status(500).json(err);
} 
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
        include: [{model: Product}],
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with that id!' });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/',async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create(req.body) 
    res.status(200).json(newTag)
  }catch  (err) {
    res.status(400).json(err)
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const id = req.params.id
    const body= req.body
   await Tag.update(body, { where:{ id } })
   const updatedTag = await Tag.findByPk(req.params.id)
   res.status(200).json(updatedTag)
  
  } catch(error) {
    res.status(500).json(error)
}
})

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try{
    const id = req.params.id
    const deletedTag = await Tag.destroy({ where:{ id } })
    res.json(deletedTag)
  } catch(error) {
    res.status(500).json(error)
}
});

module.exports = router;

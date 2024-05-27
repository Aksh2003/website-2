const express = require('express');
const {
  getProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  likeProperty,
  registerInterest,

} = require('../controllers/propertyController');
const router = express.Router();

router.route('/').get(getProperties).post(createProperty);
router
  .route('/:id')
  .get(getPropertyById)
  .put(updateProperty)
  .delete(deleteProperty);
router
     .route('/:id/like')
     .post(likeProperty);
router.route('/:id/interest').post(registerInterest);  
module.exports = router;

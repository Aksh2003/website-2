const express = require('express');
const {
  getProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');
const router = express.Router();

router.route('/').get(getProperties).post(createProperty);
router
  .route('/:id')
  .get(getPropertyById)
  .put(updateProperty)
  .delete(deleteProperty);

module.exports = router;

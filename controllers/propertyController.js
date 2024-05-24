const asyncHandler = require('express-async-handler');
const Property = require('../models/Property');

// @desc Get all properties
// @route GET /api/properties
// @access Public
const getProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({});
  res.json(properties);
});

// @desc Create a new property
// @route POST /api/properties
// @access Public
const createProperty = asyncHandler(async (req, res) => {
  const {
    seller,
    email,
    title,
    description,
    location,
    price,
    bedrooms,
    bathrooms,
    area,
    nearby,
  } = req.body;

  const property = new Property({
    seller,
    email,
    title,
    description,
    location,
    price,
    bedrooms,
    bathrooms,
    area,
    nearby,
  });

  const createdProperty = await property.save();
  res.status(201).json(createdProperty);
});

// @desc Get property by ID
// @route GET /api/properties/:id
// @access Public
const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (property) {
    res.json(property);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

// @desc Update a property
// @route PUT /api/properties/:id
// @access Public
const updateProperty = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    location,
    price,
    bedrooms,
    bathrooms,
    area,
    nearby,
  } = req.body;

  const property = await Property.findById(req.params.id);

  if (property) {
    property.title = title || property.title;
    property.description = description || property.description;
    property.location = location || property.location;
    property.price = price || property.price;
    property.bedrooms = bedrooms || property.bedrooms;
    property.bathrooms = bathrooms || property.bathrooms;
    property.area = area || property.area;
    property.nearby = nearby || property.nearby;

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

// @desc Delete a property
// @route DELETE /api/properties/:id
// @access Public
const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id);

  if (property) {
    res.json({ message: 'Property removed' });
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

module.exports = {
  getProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
};


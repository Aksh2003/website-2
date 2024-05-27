const asyncHandler = require('express-async-handler');
const Property = require('../models/Property');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: '20i307@psgtech.ac.in', 
    pass: 'smep vrjw fprl wsdw',
  },
});


// @desc Get all properties
// @route GET /api/properties
// @access Public
const getProperties = asyncHandler(async (req, res) => {
  const pageSize = 10; // Number of properties per page
  const page = Number(req.query.pageNumber) || 1;

  const count = await Property.countDocuments({});

  const properties = await Property.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ properties, page, pages: Math.ceil(count / pageSize) });

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
    likes: 0,
  });

  const createdProperty = await property.save();
  res.status(201).json(createdProperty);
});

// @desc Register interest in a property
// @route POST /api/properties/:id/interest
// @access Public
const registerInterest = asyncHandler(async (req, res) => {
  const { buyerEmail } = req.body;
  const property = await Property.findById(req.params.id);

  if (property) {
    const sellerEmail = property.email;

    try{
      await transporter.sendMail({
        from: '20i307@psgtech.ac.in',
        to: buyerEmail,
        subject: 'Property Interest - Contact Details',
        text: `You have expressed interest in the property titled "${property.title}". Contact the seller at ${sellerEmail}.`,
      });
  
      // Send email to seller with buyer's details
      await transporter.sendMail({
        from: '20i307@psgtech.ac.in',
        to: sellerEmail,
        subject: 'New Buyer Interest',
        text: `A buyer has expressed interest in your property titled "${property.title}". Contact the buyer at ${buyerEmail}.`,
      });
  
      res.status(200).json({ message: 'Interest registered and emails sent' });
    } 
    catch (emailError) {
      console.error('Error sending emails:', emailError);
      res.status(500).json({ message: 'Failed to send emails', error: emailError });
    }
  }
    else {
      res.status(404);
      throw new Error('Property not found');
    }
  });
  
    


    // Send email to buyer with seller's contact details
    


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

// @desc Like a property
// @route POST /api/properties/:id/like
// @access Public
const likeProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (property) {
    property.likes += 1;
    await property.save();
    res.json({ likes: property.likes });
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
  likeProperty,
  registerInterest,
};


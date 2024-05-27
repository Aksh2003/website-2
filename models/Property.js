const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  email : {type:String,required: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  nearby: { type: String, required: true },
  likes: { type: Number, default: 0 }  
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;

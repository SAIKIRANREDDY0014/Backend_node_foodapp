const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  productname : {
    type : String,
    required : true
  },
  price : {
    type : String,
    required : true
  },
  bestseller : {
    type : String
  },
  description : {
    type : String
  },
  category :{
    type : [
      {
        type : String,
        enum : ["veg","non-veg"]
      }
  ],
    required : true
  },
  image : {
    type : String
  },
  firm : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Firm'
  }]

})

const productmodel = mongoose.model('Product',productschema);

module.exports = productmodel;

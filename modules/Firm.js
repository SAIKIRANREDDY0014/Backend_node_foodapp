const mongoose = require("mongoose");

const Firmschema = new mongoose.Schema({
  firmname : {
    type : String,
    required : true,
    unique : true
  },
  area : {
    type : String,
    required : true,
  },
  category:{
    type : [
      {
        type : String,
        enum : ['veg','non-veg']
      }
    ],
  },
  region : {
    type : [
      {
        type : String,
        enum : ['south-indian','north-indian','chineese','bakery']
      }
    ],
    required : true
  },
  offer :{
    type : String
  },
  image : {
    type : String
  },
  vendor : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Vendor'
    }
  ],
  products : [
    {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Product'
  }
]
});

/*
{
    "firmname" : "kfc",
    "area" : "hyderabad",
    "category" : ["non-veg"],
    "region" : ["south-indian"],
    "offer" : "50% offer",
    "image" : "example.jpg",
}
*/
const firmmodel = mongoose.model('Firm',Firmschema);

module.exports = firmmodel;


const mongoose = require('mongoose');

// we use Schema to set our own blueprint for each instance in this collection
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  // unless you'll have more than one property defined you don't have to use this: { type: String }
  // firstName: { type: String }
  firstName: String,
  lastName: String,
  nationality: String,
  birthday: Date,
  image_url: { type: String, default: "http://cdn.shopify.com/s/files/1/1061/1924/products/Smiling_Face_Emoji_grande.png?v=1480481056" }
}, 
{
  // keep record on when created and updated
  timestamps: true
})

// we create Author class based on these previously defined rules
const Author = mongoose.model("Author", authorSchema );

// export Author class to make it available in other files
module.exports = Author;
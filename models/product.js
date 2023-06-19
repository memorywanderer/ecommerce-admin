import mongoose from "mongoose"

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Add a title'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  author: {
    type: String,
    required: [true, 'Add an author'],
  },
  description: {
    type: String,
    required: [true, 'Add a description']
  },
  price: {
    type: Number,
    required: [true, 'Add a price']
  },
  stock: {
    type: Number,
    require: [true, 'Add a stock']
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
  },
  imagesUrl: [{
    type: String,
    required: [true, 'Add an image url']
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    required: [true, 'Add a rating']
  },
  isbn: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  dimensions: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  ageRange: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', productSchema)
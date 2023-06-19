import Product from "../../models/product"
import Category from '../../models/category'
import { connectDB } from "../../utils/connectMongo"


export default async function handler(req, res) {
  const { method } = req
  await connectDB()
  try {
    if (method === 'GET') {
      // Check if requested a single product
      if (req.query?.id) {
        const product = await Product.findById({ _id: req.query?.id })
        if (!product) {
          res.status(404).json({ error: 'Product not found' });
          return;
        }
        return res.status(200).json(product)
      } else {
        // Otherwise, return all products
        const products = await Product.find().populate('category')
        return res.status(200).json(products)
      }
    } else if (method === 'POST') {
      console.log('Product created')
      const newProduct = await Product.create({
        ...req.body
      })
      return res.status(201).json(newProduct)
    } else if (method === 'PUT') {
      const { ...productData } = req.body
      // Find product by id
      const product = await Product.findById({ _id: req.query?.id })

      if (!product) {
        res.status(404).json('Product not found')
        return;
      }
      const updatedProduct = await Product.findByIdAndUpdate(req.query?.id, productData, { new: true })
      console.log("Updated prod", updatedProduct, "Product", product)
      res.status(200).json(updatedProduct)

    } else if (method === 'DELETE') {
      const product = await Product.findByIdAndDelete({ _id: req.query?.id })
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      return res.status(200).json(true)
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    return res.status(500).json({ error: `Server error: ${error}` })
  }

}
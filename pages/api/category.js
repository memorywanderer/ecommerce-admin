import Category from '../../models/category'
import { connectDB } from '../../utils/connectMongo'

export default async function handler(req, res) {
  try {
    await connectDB()
    if (req.method === 'GET') {

      if (req.query?.id) {
        const category = await Category.findById({ _id: req.query.id }).populate('parentCategory')
        res.status(200).json(category)
      } else {
        const categories = await Category.find().populate({ path: 'parentCategory' }).exec();
        res.status(200).json(categories);
      }

    } else if (req.method === 'POST') {
      const { name, parentCategory, properties } = req.body;

      console.log(req.body)
      const newCategory = await Category.create({
        name,
        parentCategory: parentCategory || null,
        properties,
      });
      res.status(201).json(newCategory);
    } else if (req.method === 'PUT') {
      if (req.query?.id) {
        const { id } = req.query
        const { name, parentCategory, properties } = req.body;
        console.log(name, parentCategory, properties)
        const category = await Category.findById(id);

        if (!category) {
          res.status(404).json({ error: 'Category not found' });
          return;
        }
        const updatedCategory = await Category.findByIdAndUpdate(id, {
          name,
          parentCategory: parentCategory || null,
          properties
        });
        res.status(200).json(updatedCategory);
      }
    } else if (req.method === 'DELETE') {
      const category = await Category.findByIdAndDelete({ _id: req.query.id });
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }
      res.status(200).json(true);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: `Server error: ${error}` })
  }
}
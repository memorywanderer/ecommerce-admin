import Order from '../../models/order'
import { connectDB } from '../../utils/connectMongo'

export default async function handler(req, res) {
  try {
    await connectDB()
    if (req.method === 'GET') {
      const orders = await Order.find()
      if (orders.length > 0) {
        return res.status(200).json(orders)
      } else {
        return res.status(404).json('Orders not found')
      }
    } else {
      return res.status(409).json('Method is not allowed')
    }
  } catch (error) {
    return res.status(500).json(`Server error ${error}`)
  }

}
import axios from "axios"
import Head from "next/head"
import { useEffect, useState } from "react"

const Orders = () => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get('/api/order')
        setOrders(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getOrders()
  }, [])
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <h1 className="text-2xl font-bold mb-2">Orders</h1>
      <div className="table-container">
        <table className="w-full bg-white border border-secondary-light rounded-lg shadow-md overflow-x-auto">
          <thead className="bg-secondary-light">
            <tr>
              <th className="text-sm text-left text-primary-dark border-secondary-dark px-4 py-2">Recepient</th>
              <th className="text-sm text-left text-primary-dark border-secondary-dark px-4 py-2">Product</th>
              <th className="text-sm text-left text-primary-dark border-secondary-dark px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 && orders.map(order => {
              return <tr key={order._id}>
                <td
                  className="text-sm text-gray-600 border-b border-secondary-light  px-4 py-1">
                  {order.name}<br />
                  {order.email}<br />
                  {order.country}<br />
                  {order.streetAddress}
                </td>
                <td
                  className="text-sm text-gray-600 border-b border-secondary-light  px-4 py-1"
                >
                  {order.line_items.length > 0 && order.line_items.map((item) => (
                    <>{item?.price_data?.product_data.name}</>
                  ))}
                </td>
                <td
                  className="text-sm text-gray-600 border-b border-secondary-light  px-4 py-1"
                >
                  {(new Date(order.createdAt).toLocaleString())}
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default Orders
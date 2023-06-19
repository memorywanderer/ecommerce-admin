import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ProductForm } from "../../../components/ProductForm"
import axios from "axios"

const EditProduct = () => {
  const [productData, setProductData] = useState(null)
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get(`/api/product/?id=${id}`).then(response => {
      setProductData(response.data)
    }).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  }, [])

  return (
    <>
      <h1>Edit product</h1>
      <ProductForm {...productData} />
    </>
  )
}
export default EditProduct
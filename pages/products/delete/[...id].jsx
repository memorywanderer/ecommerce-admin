import axios from "axios"
import { useRouter } from "next/router"

const DeleteProduct = () => {
  const router = useRouter()
  const { id } = router.query
  const handleDelete = () => {
    axios.delete(`/api/product/?id=${id}`).then(response => {
      if (response.status === 200) {
        router.push('/products')
      } else {
        console.log('Response failed with status', response.status)
      }
    }).catch(error => {
      console.error('Axios delete error:', error);
    })
  }

  const handleCancel = () => {
    router.push('/products')
  }
  return (
    <>
      <h1 className="text-xl font-bold mb-3">Delete product </h1>
      <div className="flex items-center gap-2">
        <button onClick={handleDelete} className="text-md font-bold bg-danger text-primary-light flex items-center px-3 py-2 rounded-lg">Yes</button>
        <button onClick={handleCancel} className="text-md font-bold bg-primary-dark text-primary-light flex items-center px-3 py-2 rounded-lg">No</button>
      </div>
    </>
  )
}
export default DeleteProduct
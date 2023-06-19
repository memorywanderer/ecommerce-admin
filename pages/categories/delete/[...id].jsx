import axios from "axios"
import { useRouter } from "next/router"


const DeleteCategory = () => {
  const router = useRouter()
  const { id } = router.query

  const handleDelete = () => {
    axios.delete(`/api/category/?id=${id}`).then(repsonse => {
      if (repsonse.status === 200)
        router.push('/categories')
    })
      .catch(error =>
        console.error('error in delete category: ', error)
      )
  }

  const handleCancel = () => {
    router.push('/categories')
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-3">Delete category</h1>
      <div className="flex items-center gap-2">
        <button onClick={handleDelete} className="text-md font-bold bg-danger text-primary-light flex items-center px-3 py-2 rounded-lg">Yes</button>
        <button onClick={handleCancel} className="text-md font-bold bg-primary-dark text-primary-light flex items-center px-3 py-2 rounded-lg">No</button>
      </div>
    </>
  )
}

export default DeleteCategory
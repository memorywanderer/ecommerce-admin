import { useEffect, useState } from "react"
import { CategoryForm } from "../../../components/CategoryForm"
import { useRouter } from "next/router"
import axios from "axios"

const EditCategory = () => {
  const [categoryData, setCategoryData] = useState()
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    axios.get(`/api/category/?id=${id}`).then(response => {
      setCategoryData(response.data)
    }).catch(error => console.error('error in editing category: ', error))
  }, [])
  return (
    <>
      <div>Edit category</div>
      <CategoryForm {...categoryData} />
    </>

  )
}

export default EditCategory
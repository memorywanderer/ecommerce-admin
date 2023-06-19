import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import * as yup from 'yup'
import Link from "next/link"
import axios from "axios"
import Image from 'next/image';

export const ProductForm = ({
  _id,
  title,
  description,
  author,
  price,
  stock,
  category,
  imagesUrl,
  rating,
  isbn,
  pages,
  language,
  dimensions,
  cover,
  ageRange,
}) => {
  const [selectedImages, setSelectedImages] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios.get('/api/category').then(response => {
      setCategories(response.data)
    })
  }, [])

  useEffect(() => {
    formik.setFieldValue('imagesUrl', selectedFiles.map(file => file))
  }, [selectedFiles])

  useEffect(() => {
    return () => {
      selectedImages.forEach(file => URL.revokeObjectURL(file));
    };
  }, []);


  const router = useRouter()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title || '',
      author: author || '',
      description: description || '',
      price: price || 0,
      stock: stock || 0,
      category: category || '',
      imagesUrl: imagesUrl || [],
      rating: rating || 0,
      isbn: isbn || '',
      pages: pages || 0,
      language: language || '',
      dimensions: dimensions || '',
      cover: cover || '',
      ageRange: ageRange || '',
    },
    onSubmit: async (values) => {
      let data = {}
      if (selectedFiles) {
        const formData = new FormData()
        values.imagesUrl.forEach((file) => formData.append('imageUrls', file))
        await axios.post('/api/upload', formData)
          .then(res => {
            const fileNames = res.data.fileNames
            console.log(imagesUrl && imagesUrl)
            imagesUrl && imagesUrl.forEach(i => fileNames.push(i))
            data = {
              ...values,
              imagesUrl: fileNames
            }
            console.log('data', data)
          })
          .catch(error => console.error('error', error))
      }
      try {
        console.log('values', values)
        if (!_id) {
          await axios.post('/api/product', data).then(res => console.log(res))
          setSubmitted(true)
          setMessage('Product has created')
          router.push('/products')
        } else {
          await axios.put(`/api/product/?id=${_id}`, { ...data }).then(res => console.log(res))
          setSubmitted(true)
          setMessage('Product has updated')
          router.push('/products')
        }
      } catch (error) {
        console.error('There is error', error)
      }
    },
    validationSchema: yup.object({
      title: yup.string().required('Title is required'),
      author: yup.string().required('Author is required'),
      description: yup.string().trim().required('Description is required'),
      price: yup.number().min(500, 'Price should be greater than 500').max(9999999, 'Price should be less than 9999999').required('Price is required'),
      stock: yup.number().required('Stock is required'),
      category: yup.string().required('Category is required'),
      isbn: yup.string().required('ISBN is required'),
      pages: yup.number().required('Pages is required'),
      language: yup.string().required('Language is required'),
      dimensions: yup.string().required('Dimensions is required'),
      cover: yup.string().required('Cover is required'),
      ageRange: yup.string().required('Age is required'),
      rating: yup.number()
    })
  })

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setSelectedImages(prevImages => [...prevImages, URL.createObjectURL(file)])
      setSelectedFiles(prevFiles => [...prevFiles, file])
    }
  }
  return (
    <div>
      <div role="alert" hidden={!submitted} className="text-xl text-success">{message}</div>
      <form className="w-full max-w-xl" onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-1'>
          <label htmlFor="title">Title:</label>
          <input
            className='p-2 border border-secondary-dark rounded-md'
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.errors.title && formik.touched.title ? <div className="text-danger">{formik.errors.title}</div> : null}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="author">Author:</label>
          <input
            className='p-2 border border-secondary-dark rounded-md'
            type="text"
            id="author"
            name="author"
            placeholder="Author"
            value={formik.values.author}
            onChange={formik.handleChange}

          />
          {formik.errors.author && formik.touched.author ? <div className="text-danger">{formik.errors.author}</div> : null}
        </div>
        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor="description">Description:</label>
          <textarea
            className='p-2 border border-secondary-dark rounded-md'
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.errors.description && formik.touched.description ? <div className="text-danger">{formik.errors.description}</div> : null}
        </div>
        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor="description">ISBN:</label>
          <input
            className='p-2 border border-secondary-dark rounded-md'
            type="text"
            id="isbn"
            name="isbn"
            placeholder="ISBN"
            value={formik.values.isbn}
            onChange={formik.handleChange}
          />
          {formik.errors.isbn && formik.touched.isbn ? <div className="text-danger">{formik.errors.isbn}</div> : null}
        </div>
        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor="pages">Count of pages:</label>
          <input
            className='p-2 border border-secondary-dark rounded-md'
            type="text"
            id="pages"
            name="pages"
            placeholder="Book length"
            value={formik.values.pages}
            onChange={formik.handleChange}
          />
          {formik.errors.pages && formik.touched.pages ? <div className="text-danger">{formik.errors.pages}</div> : null}
        </div>
        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor="language">Language:</label>
          <input
            className='p-2 border border-secondary-dark rounded-md'
            type="text"
            id="language"
            name="language"
            placeholder="Language"
            value={formik.values.language}
            onChange={formik.handleChange}
          />
          {formik.errors.language && formik.touched.language ? <div className="text-danger">{formik.errors.language}</div> : null}
        </div>
        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor="dimensions">Dimensions:</label>
          <input
            className='p-2 border border-secondary-dark rounded-md'
            type="text"
            id="dimensions"
            name="dimensions"
            placeholder="Dimensions"
            value={formik.values.dimensions}
            onChange={formik.handleChange}
          />
          {formik.errors.dimensions && formik.touched.dimensions ? <div className="text-danger">{formik.errors.dimensions}</div> : null}
        </div>
        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor="cover">Cover type:</label>
          <input
            className='p-2 border border-secondary-dark rounded-md'
            type="text"
            id="cover"
            name="cover"
            placeholder="Cover type"
            value={formik.values.cover}
            onChange={formik.handleChange}
          />
          {formik.errors.cover && formik.touched.cover ? <div className="text-danger">{formik.errors.cover}</div> : null}
        </div>
        <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor="cover">Age range:</label>
          <input
            className='p-2 border border-secondary-dark rounded-md'
            type="text"
            id="ageRange"
            name="ageRange"
            placeholder="Age range"
            value={formik.values.ageRange}
            onChange={formik.handleChange}
          />
          {formik.errors.ageRange && formik.touched.ageRange ? <div className="text-danger">{formik.errors.ageRange}</div> : null}
        </div>
        <div className='flex flex-col gap-1'>
          {imagesUrl && imagesUrl.map(imageUrl => (
            <Image
              key={imageUrl}
              src={`/images/${imageUrl}`}
              width={128}
              height={256}
              alt={imageUrl}
            />
          ))}
          {selectedImages.length > 0 && selectedImages.map((src, index) => (
            <Image
              key={index}
              src={src}
              width={128}
              height={256}
              alt={src}
            />
          ))}

          <label className="cursor-pointer flex flex-col items-center max-w-fit p-4 bg-secondary-light rounded-lg" htmlFor="images">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <span>
              Add image
            </span>
            <input
              className='hidden'
              type="file"
              accept="image/*"
              id="images"
              name="imagesUrl"
              onChange={handleImageUpload}
            />
          </label>
          {formik.errors.imagesUrl && formik.touched.imagesUrl ? <div className="text-danger">{formik.errors.description}</div> : null}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="price">Price:</label>
          <input
            className='p-2 border border-secondary-dark rounded-md'
            type="number"
            min={0}
            max={999999}
            id="price"
            name="price"
            placeholder="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.errors.price && formik.touched.price ? <div className="text-danger">{formik.errors.price}</div> : null}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="stock">Stock:</label>
          <input
            className='p-2 border border-secondary-dark rounded-md'
            type="number"
            id="stock"
            name="stock"
            placeholder="Stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
          />
          {formik.errors.stock && formik.touched.stock ? <div className="text-danger">{formik.errors.stock}</div> : null}
        </div>
        <div className='flex flex-col gap-1 mb-4'>
          <label htmlFor="category">Category:</label>
          <select
            className='p-2 border bg-white border-secondary-dark rounded-md'
            type="text"
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            <option key='0' value="">Uncategorized</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {formik.errors.category && formik.touched.category ? <div className="text-danger">{formik.errors.category}</div> : null}
        </div>
        <button
          className="btn-primary max-w-none mb-2"
          type="submit"
        >
          Save
        </button>
        <Link className="flex justify-center w-full font-bold bg-secondary-light text-primary-dark px-2 py-2 rounded-lg" href="/products">Back to products</Link>
      </form>
    </div>
  )
}
import { useFormik } from "formik"
import * as yup from 'yup'
import Head from "next/head"
import { useEffect, useState } from "react"
import axios from "axios"

import Link from "next/link"

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get('/api/category').then(response => {
      setCategories(response.data)
    }).catch(error => {
      console.error('error in categories: ', error)
    })
  }, [])
  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <div className="flex items-center gap-2">
      <h1 className="text-2xl font-bold mb-2">Categories</h1>
      <Link
        href='/categories/new'
        className="btn-primary mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        New category
      </Link>
      </div>
      <div className="table-container">
      <table className="w-full bg-white border border-secondary-light rounded-lg shadow-md">
        <thead className="bg-secondary-light">
          <tr>
            <th className="text-sm text-left text-primary-dark border-primary-dark px-4 py-2">Parent category</th>
            <th className="text-sm text-left text-primary-dark border-primary-dark px-4 py-2">Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? categories.map(category => (
            <tr key={category._id}>
              <td className="text-sm text-gray-600 border-b border-secondary-light  px-4 py-1">
                {category.parentCategory?.name}
              </td>
              <td className="text-sm text-gray-600 border-b border-secondary-light  px-4 py-1">
                {category.name}
              </td>
              <td className="flex items-center justify-end gap-2 text-sm text-gray-600 border-b border-secondary-light px-4 py-1">
                <Link
                  className="btn-primary"
                  href={`/categories/edit/${category._id}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Edit
                </Link>
                <Link
                  className="btn-danger-primary"
                  href={`/categories/delete/${category._id}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>

                  Delete
                </Link>
              </td>
            </tr>
          )) :
            <tr>
              <td className="text-sm text-gray-600 border-b border-secondary-light  px-4 py-1">
                Categories are empty
              </td>
              <td className="text-sm text-gray-600 border-b border-secondary-light  px-4 py-1">
                <Link className="max-w-fit text-md font-bold bg-secondary-dark text-primary-light flex items-center px-3 py-2 rounded-lg" href={`/categories/new`}>Create one</Link>
              </td>
            </tr>
          }
        </tbody >
      </table >
      </div>
    </>
  );
};

export default Categories;

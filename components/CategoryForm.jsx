import { useFormik } from "formik"
import * as yup from 'yup'
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import Link from "next/link"


export const CategoryForm = ({
  _id,
  name,
  parentCategory,
  properties
}) => {
  const [categories, setCategories] = useState([]);
  const router = useRouter()

  useEffect(() => {
    axios.get('/api/category/').then(response => {
      setCategories(response.data);
    }).catch(error => {
      console.error('Error in categories: ', error);
    });
  }, []);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name || '',
      parentCategory: parentCategory || '',
      properties: properties || [
        {
          name: '',
          value: ''
        }
      ]
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
    }),
    onSubmit: async (values) => {
      // handle form submission
      const data = {
        name: values.name,
        parentCategory: values.parentCategory,
        properties: values.properties.map(property => ({
          name: property.name,
          value: property.value
        }))
      }
      try {
        if (!_id) {
          await axios.post('/api/category', data).then(response => {
            if (response.status === 201) {
              router.push('/categories')
            }
          }
          ).catch(error => {
            console.error('Error in categories:', error)
          })
        } else {
          await axios.put(`/api/category/?id=${_id}`, data).then(response => {
            if (response.status === 200) {
              router.push('/categories')
            }
          }).catch(error => {
            console.error('Error in categories:', error)
          })

        }
      } catch (error) {
        console.error('Error in categories:', error)
      }
    }
  });

  const handleRemoveProperty = (index) => {
    const properties = [...formik.values.properties];
    properties.splice(index, 1);
    formik.setFieldValue('properties', properties);
  };

  const handleAddProperty = () => {
    const properties = [...formik.values.properties];
    properties.push({ name: '', value: '' });
    formik.setFieldValue('properties', properties);
  };
  return (
    <form className="max-w-xl" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name:</label>
        <input
          className="p-2 border border-primary-dark rounded-md"
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && formik.touched.name ? <div className="text-danger">{formik.errors.name}</div> : null}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="parentCategory">Parent category:</label>
        <select
          className="p-2 border bg-white border-primary-dark rounded-md"
          id="parentCategory"
          name="parentCategory"
          value={formik.values.parentCategory}
          onChange={formik.handleChange}
        >
          <option key='0' value="">No parent category</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>

      {formik.values.properties.map((property, index) => (
        <div className="flex flex-col gap-1" key={index}>
          <label htmlFor={`property-name-${index}`}>Name:</label>
          <input
            className="p-2 border border-primary-dark rounded-md"
            type="text"
            id={`property-name-${index}`}
            name={`properties[${index}].name`}
            value={property.name}
            onChange={formik.handleChange}
          />

          <label htmlFor={`property-value-${index}`}>Value:</label>
          <input
            className="p-2 border border-primary-dark rounded-md"
            type="text"
            id={`property-value-${index}`}
            name={`properties[${index}].value`}
            value={property.value}
            onChange={formik.handleChange}
          />

          <button
            type="button"
            className="mb-2 flex justify-center w-full font-bold bg-danger-lighter text-error px-2 py-2 rounded-lg"
            onClick={() => handleRemoveProperty(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        className="flex justify-center w-full font-bold bg-secondary-light text-primary-dark px-2 py-2 rounded-lg"
        onClick={handleAddProperty}
      >
        Add Property
      </button>

      <button
        className="btn-primary mb-2 max-w-none"
        type="submit"
      >
        Save
      </button>
      <Link className="flex justify-center w-full font-bold bg-secondary-light text-primary-dark px-2 py-2 rounded-lg" href="/categories">Back to categories</Link>
    </form>
  )
}
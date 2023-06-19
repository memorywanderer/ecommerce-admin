import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Loading } from '../components/Loading'

const Login = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  const router = useRouter()
  // Initial values
  const initialValues = {
    email: '',
    password: ''
  }

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  })

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      setSubmitting(true)
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      }).then(({ ok, error }) => {
        if (ok) {
          router.push('/')
        } else {
          setFieldError('password', 'Incorrect email or password')
        }
      })
      setSubmitting(false)
    } catch (error) {
      setSubmitting(false)
      setFieldError('password', error)
    }
  }

  if (isSubmitting) {
    return <Loading />
  }

  return (
    <div className="max-w-md w-full shadow p-3 m-2 rounded-lg bg-primary-light">
      <h1 className='text-2xl font-bold mb-2'>Login to Bookyard</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form className='flex flex-col gap-3 mb-5'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email:</label>
                <Field
                  className='p-2 border border-secondary-dark rounded-md'
                  type="email"
                  id="email"
                  name="email"
                />
                <ErrorMessage
                  className='text-danger'
                  name="email"
                  component="div"
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="password">Password:</label>
                <Field
                  className='p-2 border border-secondary-dark rounded-md'
                  type="password"
                  id="password"
                  name="password"
                />
                <ErrorMessage
                  className='text-danger'
                  name="password"
                  component="div"
                />
              </div>
              <button
                className="w-full font-bold bg-secondary-dark text-primary-light px-2 py-2 rounded-lg"
                type="submit"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )
        }}

      </Formik>
      {/* <form className="">
          <div className="flex flex-col gap-1 mb-5">
            <label htmlFor="email">Email</label>
            <input
              className='p-2 border border-primary-dark rounded-md'
              name="email"
              type="email"
              placeholder="email@email.com"
              value={loginData.email}
              onChange={inputOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1 mb-5">
            <label htmlFor="password">Password</label>
            <input
              className='p-2 border border-primary-dark  rounded-md'
              name="password"
              type="password"
              placeholder="password"
              value={loginData.password}
              onChange={inputOnChange}
              required
            />
          </div>
          <button onClick={onSubmit} className="w-full font-bold bg-primary-dark  text-primary-light px-2 py-2 rounded-lg" type="submit">Log in</button>
        </form> */}

    </div>

  )
}

export default Login
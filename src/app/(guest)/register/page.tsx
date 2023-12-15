'use client'
import Link from 'next/link'
import * as Yup from 'yup'
import axios, { AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'

import { useAuth } from '@/hooks/auth'
import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'

interface Values {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const RegisterPage = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const submitForm = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>,
  ): Promise<any> => {
    try {
      await register(values)
    } catch (error: Error | AxiosError | any) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('The name field is required.'),
    email: Yup.string()
      .email('Invalid email')
      .required('The email field is required.'),
    password: Yup.string().required('The password field is required.'),
    password_confirmation: Yup.string()
      .required('Please confirm password.')
      .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
  })

  return (
    <AuthCard>
      <h2 className="font-bold text-[34px] tracking-tighter mb-8 text-center">
        Register
      </h2>

      <Formik
        onSubmit={submitForm}
        validationSchema={RegisterSchema}
        initialValues={{
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }}>
        <Form className="space-y-8">
          <div>
            <Field
              id="name"
              name="name"
              className="block p-4 leading-[150%] w-full rounded-2xl outline-none border-transparent bg-white placeholder:text-[#99A6AE] font-medium focus:outline-none focus:border-transparent focus:ring-transparent"
              placeholder="Name"
            />

            <ErrorMessage
              name="name"
              component="span"
              className="text-xs text-red-500"
            />
          </div>

          <div>
            <Field
              id="email"
              name="email"
              type="email"
              className="block p-4 leading-[150%] w-full rounded-2xl outline-none border-transparent bg-white placeholder:text-[#99A6AE] font-medium focus:outline-none focus:border-transparent focus:ring-transparent"
              placeholder="Email"
            />

            <ErrorMessage
              name="email"
              component="span"
              className="text-xs text-red-500"
            />
          </div>

          <div className="">
            <Field
              id="password"
              name="password"
              type="password"
              className="block p-4 leading-[150%] w-full rounded-2xl outline-none border-transparent bg-white placeholder:text-[#99A6AE] font-medium focus:outline-none focus:border-transparent focus:ring-transparent"
              placeholder="Password"
            />

            <ErrorMessage
              name="password"
              component="span"
              className="text-xs text-red-500"
            />
          </div>

          <div className="">
            <Field
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              className="block p-4 leading-[150%] w-full rounded-2xl outline-none border-transparent bg-white placeholder:text-[#99A6AE] font-medium focus:outline-none focus:border-transparent focus:ring-transparent"
              placeholder="Confirm Password"
            />

            <ErrorMessage
              name="password_confirmation"
              component="span"
              className="text-xs text-red-500"
            />
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="text-white px-4 py-3 rounded-2xl bg-primary font-bold w-full tracking-[-0.2px]">
              Register
            </button>

            <p className="text-center">
              <Link
                href="/login"
                className="text-center font-bold leading-[150%] tracking-[-0.4px] text-primary hover:text-primary-shade-1">
                Already registered?
              </Link>
            </p>
          </div>
        </Form>
      </Formik>
    </AuthCard>
  )
}

export default RegisterPage

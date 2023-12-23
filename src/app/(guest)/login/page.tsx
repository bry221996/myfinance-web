'use client'
import Link from 'next/link'
import * as Yup from 'yup'
import { useSearchParams } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'

import { useAuth } from '@/hooks/auth'
import AuthCard from '@/components/AuthCard'
import { useEffect, useState } from 'react'
import AuthSessionStatus from '@/components/AuthSessionStatus'

interface Values {
  email: string
  password: string
  remember: boolean
}

const LoginPage = () => {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<string>('')

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  useEffect(() => {
    const resetToken = searchParams.get('reset')
    setStatus(resetToken ? atob(resetToken) : '')
  }, [searchParams])

  const submitForm = async (
    values: Values,
    { setSubmitting, setErrors }: FormikHelpers<Values>,
  ): Promise<any> => {
    try {
      await login(values)
    } catch (error: Error | AxiosError | any) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
      setStatus('')
    }
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('The email field is required.'),
    password: Yup.string().required('The password field is required.'),
  })

  return (
    <AuthCard>
      <AuthSessionStatus className="mb-4" status={status} />

      <h2 className="font-bold text-[34px] tracking-tighter mb-8 text-center">
        Sign in
      </h2>

      <Formik
        onSubmit={submitForm}
        validationSchema={LoginSchema}
        initialValues={{ email: '', password: '', remember: false }}>
        <Form className="space-y-8">
          <div>
            <Field
              id="email"
              name="email"
              type="email"
              className="block p-4 leading-[150%] w-full rounded-2xl outline-none border-transparent bg-white placeholder:text-[#99A6AE] font-medium focus:outline-none focus:border-transparent focus:ring-transparent"
              placeholder="Email Address"
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

          <div className="flex items-center justify-between">
            <label htmlFor="remember" className="inline-flex items-center">
              <Field
                type="checkbox"
                name="remember"
                className="rounded border-[#99A6AE] text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />

              <span className="ml-2 text-[#252729] leading-[150%] tracking-[-0.4px] font-medium">
                Remember me
              </span>
            </label>

            <div className="flex items-center">
              <Link
                href="/forgot-password"
                className="font-bold leading-[150%] tracking-[-0.4px] text-primary-shade-1 hover:text-primary-shade-2">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="text-white px-4 py-3 rounded-2xl bg-primary font-bold w-full tracking-[-0.2px]">
            Login
          </button>
        </Form>
      </Formik>
    </AuthCard>
  )
}

export default LoginPage

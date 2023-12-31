import React from 'react'
import * as Yup from 'yup'
import Axios, { AxiosError } from 'axios'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'

import Modal from '@/components/Modal'
import useProfile from '@/hooks/profile'
import { ProfileType } from '@/types/Profile'

interface ProfileFormModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  profile?: ProfileType | null
}

interface FormValues {
  name: string
  description: string
}

const ProfileFormModal = ({
  isOpen,
  profile,
  setIsOpen,
}: ProfileFormModalProps) => {
  const { createProfile, updateProfile } = useProfile()

  const submitForm = async (
    values: FormValues,
    { setSubmitting, setErrors }: FormikHelpers<FormValues>,
  ): Promise<any> => {
    try {
      profile
        ? await updateProfile(profile?.id, values)
        : await createProfile(values)
      setIsOpen(false)
    } catch (error: Error | AxiosError | any) {
      if (Axios.isAxiosError(error) && error.response?.status === 422) {
        setErrors(error.response?.data?.errors)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required('The name field is required.'),
    description: Yup.string().required('The description field is required.'),
  })

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title
          as="h3"
          className="text-lg font-bold leading-[120%] tracking-[-0.5px] text-[#002034] flex justify-between items-center">
          {profile ? 'Edit Profile' : 'Create new Profile'}
          <XMarkIcon
            className="w-5 h-5 text-[#002034]"
            onClick={() => setIsOpen(false)}
          />
        </Dialog.Title>

        <div className="mt-6">
          <Formik
            initialValues={{
              name: profile?.name ?? '',
              description: profile?.description ?? '',
            }}
            onSubmit={submitForm}
            validationSchema={ProfileSchema}>
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm text-[#4D6371]">Name</label>
                  <Field
                    id="name"
                    name="name"
                    className="block p-2 leading-[150%] w-full rounded-2xl bg-white placeholder:text-[#99A6AE] font-medium"
                    placeholder="Name"
                  />

                  <ErrorMessage
                    name="name"
                    component="span"
                    className="text-xs text-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-[#4D6371]">Description</label>

                  <Field
                    id="description"
                    name="description"
                    className="block p-2 leading-[150%] w-full rounded-2xl bg-white placeholder:text-[#99A6AE] font-medium"
                    placeholder="Description"
                  />

                  <ErrorMessage
                    name="description"
                    component="span"
                    className="text-xs text-red-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white px-4 py-3 rounded-2xl bg-primary font-bold w-full tracking-[-0.2px]">
                  {profile ? 'Update' : 'Submit'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ProfileFormModal

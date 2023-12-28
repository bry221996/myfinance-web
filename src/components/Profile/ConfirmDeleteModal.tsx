import React from 'react'
import { AxiosError } from 'axios'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'

import axios from '@/lib/axios'
import Modal from '@/components/Modal'
import { ProfileType } from '@/types/Profile'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  profile: ProfileType
}

const ConfirmDeleteModal = ({
  isOpen,
  profile,
  setIsOpen,
}: ConfirmDeleteModalProps) => {
  const onDelete = async (): Promise<any> => {
    try {
      await axios.delete(`/api/profiles/${profile.id}`)
      setIsOpen(false)
    } catch (error: Error | AxiosError | any) {
      console.log(error.message)
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title
          as="h3"
          className="text-lg font-bold leading-[120%] tracking-[-0.5px] text-[#002034] flex justify-between items-center">
          Delete Profile
          <XMarkIcon
            className="w-5 h-5 text-[#002034]"
            onClick={() => setIsOpen(false)}
          />
        </Dialog.Title>

        <div className="mt-6 space-y-8">
          <label className="text-sm text-[#4D6371]">
            Are you sure you want to delete {profile.name} ?
          </label>

          <div className="flex space-x-2">
            <button
              type="submit"
              onClick={() => setIsOpen(false)}
              className="text-primary px-4 py-3 rounded-2xl border-primary font-bold w-full tracking-[-0.2px]">
              Cancel
            </button>

            <button
              type="submit"
              onClick={onDelete}
              className="text-white px-4 py-3 rounded-2xl bg-primary font-bold w-full tracking-[-0.2px]">
              Delete
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ConfirmDeleteModal

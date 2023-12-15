import React from 'react'
import Modal from '../Modal'

type ProfileFormModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const ProfileFormModal = ({ isOpen, setIsOpen }: ProfileFormModalProps) => {
  return <Modal isOpen={isOpen} setIsOpen={setIsOpen}></Modal>
}

export default ProfileFormModal

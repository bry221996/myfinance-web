'use client'
import useSWR, { Fetcher } from 'swr'
import React, { useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

import axios from '@/lib/axios'

import Modal from '@/components/Modal'
import ProfileCard from '@/components/Profile/ProfileCard'
import { ProfileType } from '@/types/Profile'
import ProfileFormModal from '@/components/Profile/ProfileFormModal'
import ConfirmDeleteModal from '@/components/Profile/ConfirmDeleteModal'

const ProfilesPage = () => {
  const fetcher: Fetcher<ProfileType[], string> = () =>
    axios
      .get('/api/profiles')
      .then(res => res.data.data)
      .catch(error => {
        throw error.response?.data || error.message || 'Unknown error occurred'
      })

  const { data, mutate } = useSWR('/api/profiles', fetcher)

  const [openForm, setOpenForm] = useState<boolean>(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    useState<boolean>(false)

  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(
    null,
  )

  const toggleFormModal = (isOpen: boolean): void => {
    setOpenForm(isOpen)
    setSelectedProfile(null)
    mutate()
  }

  const toggleConfirmDeletionModal = (isOpen: boolean): void => {
    setOpenDeleteConfirmation(isOpen)

    if (!isOpen) {
      setSelectedProfile(null)
      mutate()
    }
  }

  const onEditProfile = (profile: ProfileType) => {
    setSelectedProfile(profile)
    setOpenForm(true)
  }

  const onDeleteProfile = (profile: ProfileType) => {
    setSelectedProfile(profile)
    toggleConfirmDeletionModal(true)
  }

  return (
    <div className="max-w-3xl mx-auto py-4 px-2">
      {selectedProfile && (
        <ConfirmDeleteModal
          profile={selectedProfile}
          isOpen={openDeleteConfirmation}
          setIsOpen={toggleConfirmDeletionModal}
        />
      )}

      <ProfileFormModal
        isOpen={openForm}
        profile={selectedProfile}
        setIsOpen={toggleFormModal}
      />

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl leading-[120%] tracking-[-2px]">
          Profiles
        </h2>

        <button
          onClick={() => setOpenForm(true)}
          className="flex items-center space-x-1 bg-primary text-white tracking-[-1px] font-semibold px-2 py-1.5 rounded-md">
          <span>Create new</span>
          <PlusCircleIcon className="w-5 h-5" />
        </button>
      </div>

      <ul className="space-y-4 mt-8">
        {data &&
          data.map(profile => (
            <ProfileCard
              className="border-white"
              key={`profile-${profile.id}`}
              profile={profile}
              onEdit={onEditProfile}
              onDelete={onDeleteProfile}
            />
          ))}
      </ul>
    </div>
  )
}

export default ProfilesPage

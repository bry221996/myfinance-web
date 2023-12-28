'use client'
import React, { useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

import useProfile from '@/hooks/profile'
import { ProfileType } from '@/types/Profile'
import ProfileCard from '@/components/Profile/ProfileCard'
import ProfileFormModal from '@/components/Profile/ProfileFormModal'
import ConfirmDeleteModal from '@/components/Profile/ConfirmDeleteModal'

const ProfilesPage = () => {
  const { profiles } = useProfile()

  const [openForm, setOpenForm] = useState<boolean>(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    useState<boolean>(false)

  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(
    null,
  )

  const toggleFormModal = (isOpen: boolean): void => {
    setOpenForm(isOpen)
    setSelectedProfile(null)
  }

  const toggleConfirmDeletionModal = (isOpen: boolean): void => {
    setOpenDeleteConfirmation(isOpen)

    if (!isOpen) {
      setSelectedProfile(null)
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
        {profiles &&
          profiles.map(profile => (
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

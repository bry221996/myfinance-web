'use client'
import useSWR, { Fetcher } from 'swr'
import React, { useState } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

import axios from '@/lib/axios'

import Modal from '@/components/Modal'
import ProfileCard from '@/components/Profile/ProfileCard'
import { ProfileType } from '@/types/Profile'
import ProfileFormModal from '@/components/Profile/ProfileFormModal'

const ProfilesPage = () => {
  const fetcher: Fetcher<ProfileType[], string> = () =>
    axios
      .get('/api/profiles')
      .then(res => res.data.data)
      .catch(error => {
        throw error.response?.data || error.message || 'Unknown error occurred'
      })

  const { data } = useSWR('/api/profiles', fetcher)
  const [openForm, setOpenForm] = useState<boolean>(false)

  return (
    <div className="max-w-3xl mx-auto py-4 px-2">
      <ProfileFormModal isOpen={openForm} setIsOpen={setOpenForm} />

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl leading-[120%] tracking-[-2px]">
          Profiles
        </h2>

        <button
          onClick={() => setOpenForm(true)}
          className="flex items-center space-x-1 bg-primary text-white tracking-[-1px] font-medium px-2 py-1.5 rounded-md">
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
            />
          ))}
      </ul>
    </div>
  )
}

export default ProfilesPage

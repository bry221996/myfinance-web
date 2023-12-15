'use client'
import ProfileCard from '@/components/Profile/ProfileCard'
import axios from '@/lib/axios'
import { ProfileType } from '@/types/Profile'
import React, { useEffect, useState } from 'react'

const ProfilesPage = () => {
  const [profiles, setProfiles] = useState<ProfileType[]>([])

  useEffect(() => {
    axios.get('/api/profiles').then(response => setProfiles(response.data.data))
  }, [])

  return (
    <div className="max-w-3xl mx-auto py-4 px-2">
      <h2 className="font-bold text-2xl leading-[120%] tracking-[-2px]">
        Profiles
      </h2>

      <ul className="space-y-4 mt-8">
        {profiles.map(profile => (
          <ProfileCard key={`profile-${profile.id}`} profile={profile} />
        ))}
      </ul>
    </div>
  )
}

export default ProfilesPage

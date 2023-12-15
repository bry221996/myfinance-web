import React, { ComponentProps } from 'react'
import { ProfileType } from '@/types/Profile'

interface ProfileCardProps extends ComponentProps<'li'> {
  profile: ProfileType
}

const ProfileCard = ({
  profile,
  className = '',
  ...props
}: ProfileCardProps) => {
  return (
    <li className={`bg-white rounded-2xl p-4 ${className}`} {...props}>
      <h5 className="text-lg font-semibold leading-[120%] text-[#002034] tracking-[-1px]">
        {profile.name}
      </h5>
      <p className="text-[#4D6371] font-medium leading-[120%] mt-2">
        {profile.description}
      </p>
    </li>
  )
}

export default ProfileCard

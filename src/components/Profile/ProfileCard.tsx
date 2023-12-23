import React, { ComponentProps } from 'react'
import { ProfileType } from '@/types/Profile'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

interface ProfileCardProps extends ComponentProps<'li'> {
  profile: ProfileType
}

const ProfileCard = ({
  profile,
  className = '',
  ...props
}: ProfileCardProps) => {
  return (
    <li
      className={`bg-white rounded-2xl p-4 flex justify-between ${className}`}
      {...props}>
      <div>
        <h5 className="text-lg font-semibold leading-[120%] text-[#002034] tracking-[-1px]">
          {profile.name}
        </h5>
        <p className="text-[#4D6371] font-medium leading-[120%] mt-2">
          {profile.description}
        </p>
      </div>

      <div className="flex space-x-2 text-[#4D6371]">
        <PencilSquareIcon className="w-5 h-5" />
        <TrashIcon className="w-5 h-5" />
      </div>
    </li>
  )
}

export default ProfileCard

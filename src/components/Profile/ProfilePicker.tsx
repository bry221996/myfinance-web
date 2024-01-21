import useProfile from '@/hooks/profile'
import { ProfileType } from '@/types/Profile'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import React, { Fragment } from 'react'

interface ProfilePickerType {
  profiles: ProfileType[]
}

const ProfilePicker = ({ profiles }: ProfilePickerType) => {
  const { selectedProfile, setSelectedProfile } = useProfile()

  return (
    <Listbox value={selectedProfile} onChange={setSelectedProfile}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-default rounded-xl bg-white py-2 pl-3 pr-10 text-left focus:outline-none text-base sm:text-sm font-medium text-gray-800 sm:text-gray-500 border border-gray-200">
          <span className="block truncate">{selectedProfile?.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {profiles.map(profile => (
              <Listbox.Option
                key={profile.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 ${
                    active ? 'bg-primary text-white' : 'text-gray-800'
                  }`
                }
                value={profile}>
                {({ selected }) => (
                  <div
                    className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}>
                    <p>{profile.name}</p>
                    <p className="text-xs">{profile.description}</p>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default ProfilePicker

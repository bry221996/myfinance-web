import axios from '@/lib/axios'
import { ProfileType } from '@/types/Profile'
import useSWR, { Fetcher } from 'swr'

const useProfile = () => {
  const fetcher: Fetcher<ProfileType[], string> = () =>
    axios
      .get('/api/profiles')
      .then(res => res.data.data)
      .catch(error => {
        throw error.response?.data || error.message || 'Unknown error occurred'
      })

  const { data: profiles, mutate: refreshProfiles } = useSWR(
    '/api/profiles',
    fetcher,
  )

  const createProfile = async (values: Partial<ProfileType>) => {
    await axios.post('/api/profiles', values)

    refreshProfiles()
  }

  const updateProfile = async (
    profileId: number,
    values: Partial<ProfileType>,
  ) => {
    await axios.put(`/api/profiles/${profileId}`, values)

    refreshProfiles()
  }

  const deleteProfile = async (profileId: number) => {
    await axios.delete(`/api/profiles/${profileId}`)

    refreshProfiles()
  }

  return { profiles, createProfile, updateProfile, deleteProfile }
}

export default useProfile

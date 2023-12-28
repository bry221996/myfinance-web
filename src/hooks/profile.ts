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

  const { data: profiles, mutate } = useSWR('/api/profiles', fetcher)

  return { profiles }
}

export default useProfile

import axios from '@/lib/axios'
import { useCallback } from 'react'

const useProfile = () => {
  const getProfiles = useCallback(async () => {
    const response = await axios.get('/api/profiles')

    console.log(response.data)
  }, [])

  return { getProfiles }
}

export default useProfile

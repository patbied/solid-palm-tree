import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
const useUsers = (token) => {
  const config = {
    headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
    }
  }
    const fetchUsers= async() => {
        const res = await axios.get('/api/users/',config)
        const fetchData = await res.data
        return fetchData
    }
    const {isLoading, isError, isSuccess, error, data, refetch} = useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
      staleTime: 120000
    })
    return {isLoading, isError, isSuccess, error, data, refetch}
}

export default useUsers
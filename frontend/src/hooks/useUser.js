import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
const useUser = (id,token) => {
  const config = {
    headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
    }
  }
    const fetchUser= async() => {
        const res = await axios.get('/api/users/'+id+"/",config)
        const fetchData = await res.data
        return fetchData
    }
    const {isLoading, isError, isSuccess, error, data, refetch} = useQuery({
      queryKey: ['users',id],
      queryFn: fetchUser,
      staleTime: 120000
    })
    return {isLoading, isError, isSuccess, error, data, refetch}
}

export default useUser
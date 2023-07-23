import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
const useAllOrders = (token) => {
  const config = {
    headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
    }
  }
    const fetchOrder= async() => {
        const res = await axios.get('api/orders/',config)
        const fetchData = await res.data
        return fetchData
    }
    const {isLoading, isError, isSuccess, error, data, refetch} = useQuery({
      queryKey: ['ordersAll'],
      queryFn: fetchOrder,
      staleTime: 120000
    })
    return {isLoading, isError, isSuccess, error, data, refetch}
}

export default useAllOrders
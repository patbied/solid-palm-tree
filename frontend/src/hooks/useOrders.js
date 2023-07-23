import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
const useOrders = (token) => {
  const config = {
    headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`
    }
  }
    const fetchOrder= async() => {
        const res = await axios.get('api/orders/myorders/',config)
        const fetchData = await res.data
        return fetchData
    }
    const {isLoading, isError, isSuccess, error, data, refetch} = useQuery({
      queryKey: ['orders'],
      queryFn: fetchOrder,
      staleTime: 1
    })
    return {isLoading, isError, isSuccess, error, data, refetch}
}

export default useOrders
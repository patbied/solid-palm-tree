import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
const useProducts = () => {
    const fetchProducts = async() => {
        const res = await axios.get('/api/products/')
        const fetchData = await res.data
        return fetchData
    }
    const {isLoading, isError, isSuccess, error, data, refetch} = useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
      staleTime: 120000
    })

    return {isLoading, isError, isSuccess, error, data, refetch}
}

export default useProducts
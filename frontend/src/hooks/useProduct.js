import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
const useProduct = (id) => {

    const fetchProduct = async() => {
        const res = await axios.get('/api/products/'+id+'/')
        // console.log(res)
        const fetchData = await res.data
        return fetchData
    }
    const {isLoading, isError, isSuccess, error, data,refetch} = useQuery({
      queryKey: ['products',id],
      queryFn: fetchProduct,
      staleTime: 120000
    })
    return {isLoading, isError, isSuccess, error, data,refetch}
}

export default useProduct
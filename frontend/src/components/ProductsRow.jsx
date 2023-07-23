import React from 'react'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
const ProductsRow = ({product,refetchFn}) => {

    const userInfo = useSelector(state => state.user.userInfo)

    const config = {
        headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
        }
      }

    const deleteProductRequest = async() => {
        const {data} = await axios.delete('/api/products/delete/'+product._id,config)
        // console.log(data)
        return data
    }

    const {isLoading, isError, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ['delete-product',product._id],
        mutationFn: deleteProductRequest,
        staleTime: 120000,
        onSuccess: (data) => {
            refetchFn()
        }
      })
        const deleteHandler = () => {
            mutate()
        }

    if (isSuccess){
        console.log(data)
    }

  return (
    <tr>
                        
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>

                            <LinkContainer to={`/admin/product/${product._id}`}>
                                <Button variant='light' className='btn-sm'>
                                    View <i className='fas fa-edit'/>
                                </Button>
                            </LinkContainer>

                        </td>
                        <td>
                    
                                <Button variant='danger' className='btn-sm' onClick={deleteHandler}>
                                    Delete <i className='fas fa-trash'/>
                                </Button>
                        
                        </td>
                    </tr>
  )
}

export default ProductsRow
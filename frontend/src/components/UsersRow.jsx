import React from 'react'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
const UsersRow = ({user,refetchFn}) => {

    const userInfo = useSelector(state => state.user.userInfo)

    const config = {
        headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
        }
      }

    const deleteRequest = async() => {
        const {data} = await axios.delete('/api/users/delete/'+user.id,config)
        // console.log(data)
        return data
    }

    const {isLoading, isError, isSuccess, error, data, mutate} = useMutation({
        mutationKey: ['delete',user?._id],
        mutationFn: deleteRequest,
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
                        
                        <td>{user?._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                        <td>
                        {user.id === userInfo.id ? '' : ( 
                            <LinkContainer to={`/admin/user/${user.id}`}>
                                <Button variant='light' className='btn-sm'>
                                    View <i className='fas fa-edit'/>
                                </Button>
                            </LinkContainer>
                        )}
                        </td>
                        <td>
                        {user.id === userInfo.id ? '' : ( 
                                <Button variant='danger' className='btn-sm' onClick={deleteHandler}>
                                    Delete <i className='fas fa-trash'/>
                                </Button>
                        )}
                        </td>
                    </tr>
  )
}

export default UsersRow
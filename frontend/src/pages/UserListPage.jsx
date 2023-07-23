import React, { useEffect } from 'react'
import useUsers from '../hooks/useUsers'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'
import useDeleteUser from '../hooks/useDeleteUser'
import UsersRow from '../components/UsersRow'
const UserListPage = () => {
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.user.userInfo)
    const{isLoading, isError, isSuccess, error, data, refetch} = useUsers(userInfo.token)


    
    


    useEffect(() => {
      if (error?.response?.status === 403 || !userInfo?.isAdmin){
        navigate('/')
      }
    

    }, [error])
    
    
    if (isLoading){
        return (
        <Loader/>
        )
    }


    if (isSuccess){ 
    return (
        <div>
    {isError 
        ? 
        <Message variant='danger'err={error}>
        {error.message}
        </Message> 
        : 
        ''}
        <h1>Users</h1>
        <Table striped bordered hover style={{maxHeight:'100px !important'}} responsive className='table-sm'>
            <thead>
                <tr> 
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>View</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {data.map((user) => (
    
                <UsersRow key={user.id} user={user} refetchFn={refetch}></UsersRow>
               
                ))}
            </tbody>
        </Table>
        </div>
    )
    }}

    export default UserListPage
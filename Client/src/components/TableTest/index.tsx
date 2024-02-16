import NewUser from '../Modals/newUser'
import { reqLoadUsers } from '../../Api/Requests'
import { useState, useEffect } from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react'
import './index.css'
import AppTable from '../TableUser'

interface User {
  id: String
  name: String
  email: String
  salary: String
  lastName: String
  status: String
  role: String
  age: String
  avatar: String
}

const App = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const loadAllUsers = async () => {
      const response = await reqLoadUsers()
      setUsers(response.data)
    }
    loadAllUsers()
  }, [])

  return (
    <>
      <AppTable />
      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>LASTNAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>SALARY</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.salary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <NewUser />
    </>
  )
}

export default App

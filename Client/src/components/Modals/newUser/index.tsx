import { Input, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reqAddUser } from '../../../Api/Requests'
import { addUser } from '../../../features/usersSlice'
import { PlusIcon } from '../../TableUser/PlusIcon'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'

export default function App() {
  const dispatch = useDispatch()
  const users = useSelector((state: any) => state.users.data)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [data, setData] = React.useState({
    id: users.length + 1,
    age: '',
    name: '',
    role: '',
    email: '',
    status: '',
    avatar: '',
    team: '',
    salary: '',
    lastName: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const inputs = [
    {
      type: 'email',
      name: 'email',
      label: 'Email',
    },
    {
      type: 'text',
      name: 'name',
      label: 'Name',
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last name',
    },
    {
      type: 'number',
      name: 'salary',
      label: 'Salary',
    },
    {
      type: 'number',
      name: 'age',
      label: 'Age',
    },
    {
      type: 'text',
      name: 'avatar',
      label: 'Avatar',
    },
  ]

  const status = [
    { label: 'Active', value: 'active' },
    { label: 'Paused', value: 'paused' },
    { label: 'Vacation', value: 'vacation' },
  ]

  const roles = [
    { label: 'CEO', value: 'CEO' },
    { label: 'Admin', value: 'Admin' },
    { label: 'Mod', value: 'Mod' },
    { label: 'Helper', value: 'Helper' },
  ]

  const teams = [
    { label: 'Development', value: 'Development' },
    { label: 'UX/UI', value: 'UX/UI' },
    { label: 'Bots', value: 'Bots' },
    { label: 'Data bases', value: 'Data bases' },
  ]

  const handleAddNewUser = async () => {
    try {
      dispatch(addUser(data))
      const response = await reqAddUser(data)
      onClose()
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button onPress={onOpen} color='primary' endContent={<PlusIcon />}>
        New user
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={'inside'} backdrop='blur'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Add new user</ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              {inputs.map((input, index) => (
                <Input
                  key={index}
                  name={input.name}
                  type={input.type}
                  label={input.label}
                  onChange={(e) => handleChange(e)}
                />
              ))}
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              <Select
                label='Select an state'
                className='max-w-x'
                name='status'
                onChange={(e) => handleChange(e)}
              >
                {status.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              <Select
                label='Select an role'
                className='max-w-x'
                name='role'
                onChange={(e) => handleChange(e)}
              >
                {roles.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              <Select
                label='Select an team'
                className='max-w-x'
                name='team'
                onChange={(e) => handleChange(e)}
              >
                {teams.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Close
            </Button>
            <Button color='primary' onPress={() => handleAddNewUser()}>
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

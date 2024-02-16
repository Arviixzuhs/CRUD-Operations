import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from '@nextui-org/react'
import React, { useEffect } from 'react'
import { reqEditUser } from '../../../Api/Requests'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, setCurrentEditUserId } from '../../../features/usersSlice'

export default function EditUserProfileModal() {
  const dispatch = useDispatch()
  const currentUserIdEdit = useSelector((state: any) => state.users.currentUserIdEdit)
  const users = useSelector((state: any) => state.users.data)
  const currentUserEdit = users.find((item: { id: any }) => item.id == currentUserIdEdit)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  useEffect(() => {
    if (currentUserIdEdit !== -1) {
      onOpen()
    }
  }, [currentUserIdEdit])

  const [data, setData] = React.useState(currentUserIdEdit)

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
      defaultValue: currentUserEdit?.email,
    },
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      defaultValue: currentUserEdit?.name,
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last name',
      defaultValue: currentUserEdit?.lastName,
    },
    {
      type: 'number',
      name: 'salary',
      label: 'Salary',
      defaultValue: currentUserEdit?.salary,
    },
    {
      type: 'number',
      name: 'age',
      label: 'Age',
      defaultValue: currentUserEdit?.age,
    },
    {
      type: 'text',
      name: 'avatar',
      label: 'Avatar',
      defaultValue: currentUserEdit?.avatar,
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

  const handleResetCurrentIdEdit = () => {
    dispatch(setCurrentEditUserId(-1))
  }

  const handleAddNewUser = async () => {
    try {
      console.log(currentUserEdit)
      dispatch(editUser({ data: data, id: currentUserEdit.id }))
      const response = await reqEditUser(data, currentUserEdit.id)
      console.log(data)
      console.log(response.data) 
      onClose()

      handleResetCurrentIdEdit()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        backdrop='blur'
        onClose={handleResetCurrentIdEdit}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Edit user</ModalHeader>
          <ModalBody>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              {inputs.map((input, index) => (
                <Input
                  key={index}
                  name={input.name}
                  type={input.type}
                  label={input.label}
                  defaultValue={input.defaultValue}
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
                defaultSelectedKeys={[currentUserEdit?.status]}
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
                defaultSelectedKeys={[currentUserEdit?.role]}
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
                defaultSelectedKeys={[currentUserEdit?.team]}
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
            <Button
              color='danger'
              variant='light'
              onPress={() => {
                handleResetCurrentIdEdit()
                onClose()
              }}
            >
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

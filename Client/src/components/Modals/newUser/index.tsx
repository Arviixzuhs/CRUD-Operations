import React from 'react'
import { addUser } from '../../../features/usersSlice'
import { PlusIcon } from '../../TableUser/PlusIcon'
import { reqAddUser } from '../../../api/Requests'
import { inputs, selectInputs } from '../Inputs'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Select, SelectItem } from '@nextui-org/react'
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'

export const CreateNewUserModal = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: any) => state.users.data)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const [data, setData] = React.useState({
    id: users.length + 1,
    age: '',
    name: '',
    role: '',
    team: '',
    email: '',
    status: '',
    avatar: '',
    salary: '',
    lastName: '',
  })

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

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
              {selectInputs.map((item, index) => (
                <Select
                  key={index}
                  name={item.name}
                  label='Select an state'
                  className='max-w-x'
                  onChange={(e) => handleChange(e)}
                >
                  {item.options.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </Select>
              ))}
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

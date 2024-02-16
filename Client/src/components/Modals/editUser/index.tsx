import {
  Input,
  Modal,
  Select,
  Button,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import React from 'react'
import { reqEditUser } from '../../../api/Requests'
import { inputs, selectInputs } from '../Inputs'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, setCurrentEditUserId } from '../../../features/usersSlice'

export const EditUserProfileModal = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: any) => state.users.data)
  const currentUserIdEdit = useSelector((state: any) => state.users.currentUserIdEdit)
  const currentUserEdit = users.find((item: { id: any }) => item.id == currentUserIdEdit)
  const [data, setData] = React.useState(currentUserIdEdit)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  React.useEffect(() => {
    if (currentUserIdEdit !== -1) {
      onOpen()
    }
  }, [currentUserIdEdit])

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleResetCurrentIdEdit = () => {
    dispatch(setCurrentEditUserId(-1))
  }

  const handleAddNewUser = async () => {
    try {
      dispatch(editUser({ data: data, id: currentUserEdit?.id }))
      reqEditUser(data, currentUserEdit?.id)
      handleResetCurrentIdEdit()
      onClose()
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
                  defaultValue={currentUserEdit && currentUserEdit[input.name]}
                  onChange={(e) => handleChange(e)}
                />
              ))}
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
              {selectInputs.map((item, index) => (
                <Select
                  key={index}
                  label='Select an state'
                  name={item.name}
                  className='max-w-x'
                  onChange={(e) => handleChange(e)}
                  defaultSelectedKeys={[currentUserEdit && currentUserEdit[item.name]]}
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

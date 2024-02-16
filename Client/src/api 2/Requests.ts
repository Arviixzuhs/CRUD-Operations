import { api } from './axios'

export const reqAddUser = (data: any) => api.post('/user/save', data)
export const reqEditUser = (data: any, id: any) => api.put('/user/edit/' + id, data)
export const reqLoadUsers = () => api.get('/user/allusers')
export const reqDeleteUser = (id: any) => api.delete('/user/delete/' + id)

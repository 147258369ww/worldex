import api from './index'
export const submitContact = (data) => api.post('/contacts', data)
export const getContacts = (params) => api.get('/admin/contacts', { params })
export const markContactRead = (id, is_read) => api.put(`/admin/contacts/${id}`, { is_read })

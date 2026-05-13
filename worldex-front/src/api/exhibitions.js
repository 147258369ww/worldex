import api from './index'
export const getExhibitions = (params) => api.get('/exhibitions', { params })
export const getExhibition = (id) => api.get(`/exhibitions/${id}`)
export const getAdminExhibitions = (params) => api.get('/admin/exhibitions', { params })
export const createExhibition = (data) => api.post('/admin/exhibitions', data)
export const updateExhibition = (id, data) => api.put(`/admin/exhibitions/${id}`, data)
export const deleteExhibition = (id) => api.delete(`/admin/exhibitions/${id}`)

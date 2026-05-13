import api from './index'
export const getNews = (params) => api.get('/news', { params })
export const getNewsDetail = (id) => api.get(`/news/${id}`)
export const getAdminNews = (params) => api.get('/admin/news', { params })
export const createNews = (data) => api.post('/admin/news', data)
export const updateNews = (id, data) => api.put(`/admin/news/${id}`, data)
export const deleteNews = (id) => api.delete(`/admin/news/${id}`)

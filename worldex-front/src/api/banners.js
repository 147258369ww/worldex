import api from './index'
export const getBanners = () => api.get('/banners')
export const getAdminBanners = () => api.get('/admin/banners')
export const createBanner = (data) => api.post('/admin/banners', data)
export const updateBanner = (id, data) => api.put(`/admin/banners/${id}`, data)
export const deleteBanner = (id) => api.delete(`/admin/banners/${id}`)

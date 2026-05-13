import api from './index'
export const getCompanyInfo = () => api.get('/company-info')
export const getAdminCompanyInfo = () => api.get('/admin/company-info')
export const updateCompanyInfo = (data) => api.put('/admin/company-info', data)

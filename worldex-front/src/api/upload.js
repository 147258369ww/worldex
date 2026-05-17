import api from './index'

export const uploadFile = (file, timeout = 120000) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/admin/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout,
  })
}

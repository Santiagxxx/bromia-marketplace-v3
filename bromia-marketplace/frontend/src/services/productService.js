import apiClient from './apiClient'

export const productApi = {
  getAll(params = {}) {
    return apiClient.get('/products', { params })
  },
  getById(id) {
    return apiClient.get(`/products/${id}`)
  },
  create(payload) {
    return apiClient.post('/products', payload)
  },
  update(id, payload) {
    return apiClient.put(`/products/${id}`, payload)
  },
  toggleStatus(id) {
    return apiClient.patch(`/products/${id}/toggle`)
  },
  remove(id) {
    return apiClient.delete(`/products/${id}`)
  },
  getCategories() {
    return apiClient.get('/categories')
  },
  getStats() {
    return apiClient.get('/admin/stats')
  },
  uploadImage(file) {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/products/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

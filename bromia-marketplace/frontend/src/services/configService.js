import apiClient from './apiClient'

export const configApi = {
  getConfig() {
    return apiClient.get('/config')
  },
  updateConfig(payload) {
    return apiClient.put('/config', payload)
  }
}

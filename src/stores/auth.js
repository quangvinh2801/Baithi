import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const isAuthenticated = ref(!!user.value)

  function login(credentials) {
    // Simple login simulation
    if (credentials.username && credentials.password) {
      user.value = { username: credentials.username }
      isAuthenticated.value = true
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  }
})
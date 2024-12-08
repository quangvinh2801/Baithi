<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">LOGO</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="authStore.isAuthenticated">
            <router-link class="nav-link" to="/mycart">My Cart</router-link>
          </li>
        </ul>
        <div class="d-flex gap-2">
          <template v-if="authStore.isAuthenticated">
            <span class="navbar-text me-3">
              Welcome, {{ authStore.user.username }}
            </span>
            <button class="btn btn-outline-danger" @click="logout">Logout</button>
          </template>
          <template v-else>
            <router-link class="btn btn-outline-primary" to="/login">Login</router-link>
            <router-link class="btn btn-dark" to="/signup">Sign Up</router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
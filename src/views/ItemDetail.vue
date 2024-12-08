<template>
  <div class="container py-4">
    <div v-if="item" class="row">
      <div class="col-md-6">
        <img :src="item.image" class="img-fluid" :alt="item.name">
      </div>
      <div class="col-md-6">
        <h1>{{ item.name }}</h1>
        <p class="lead">{{ item.description }}</p>
        <p class="h3 mb-4">{{ formatCurrency(item.price) }}</p>
        <div class="mb-3">
          <label class="form-label">Quantity:</label>
          <input type="number" class="form-control w-25" v-model="quantity" min="1">
        </div>
        <button class="btn btn-primary" @click="addToCart">Add to Cart</button>
      </div>
    </div>
    <div v-else class="alert alert-danger">Product not found</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { items } from '../data/items'
import { useCartStore } from '../stores/cart'
import { formatCurrency } from '../utils/currency'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const quantity = ref(1)

const item = computed(() => 
  items.find(i => i.id === parseInt(route.params.id))
)

const addToCart = () => {
  if (item.value) {
    cartStore.addToCart({
      ...item.value,
      quantity: parseInt(quantity.value)
    })
    router.push('/mycart')
  }
}
</script>
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref(JSON.parse(localStorage.getItem('cart')) || [])
  const selectedItems = ref([])

  const subtotal = computed(() => {
    return cartItems.value.reduce((sum, item) => {
      if (selectedItems.value.includes(item.id)) {
        return sum + (item.price * item.quantity)
      }
      return sum
    }, 0)
  })

  const itemCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  function addToCart(item) {
    const existingItem = cartItems.value.find(i => i.id === item.id)
    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      cartItems.value.push({ ...item })
      selectedItems.value.push(item.id) // Auto-select newly added items
    }
    saveCart()
  }

  function updateQuantity(itemId, quantity) {
    const item = cartItems.value.find(i => i.id === itemId)
    if (item) {
      item.quantity = parseInt(quantity)
      if (item.quantity <= 0) {
        removeItem(itemId)
      } else {
        saveCart()
      }
    }
  }

  function removeItem(itemId) {
    cartItems.value = cartItems.value.filter(i => i.id !== itemId)
    selectedItems.value = selectedItems.value.filter(id => id !== itemId)
    saveCart()
  }

  function toggleSelection(itemId) {
    const index = selectedItems.value.indexOf(itemId)
    if (index === -1) {
      selectedItems.value.push(itemId)
    } else {
      selectedItems.value.splice(index, 1)
    }
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  }

  function clearCart() {
    cartItems.value = []
    selectedItems.value = []
    saveCart()
  }

  return {
    cartItems,
    selectedItems,
    subtotal,
    itemCount,
    addToCart,
    updateQuantity,
    removeItem,
    toggleSelection,
    clearCart
  }
})
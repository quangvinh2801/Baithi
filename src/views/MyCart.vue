<template>
  <div class="container py-4">
    <h2 class="mb-4">Shopping Cart</h2>
    <div class="row">
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <div v-if="cartStore.cartItems.length">
              <div v-for="item in cartStore.cartItems" :key="item.id" class="cart-item mb-3 pb-3 border-bottom">
                <div class="d-flex align-items-center">
                  <div class="form-check">
                    <input class="form-check-input" 
                           type="checkbox" 
                           :checked="cartStore.selectedItems.includes(item.id)"
                           @change="cartStore.toggleSelection(item.id)">
                  </div>
                  <img :src="item.image" class="cart-item-image mx-3" :alt="item.name">
                  <div class="flex-grow-1">
                    <h5 class="mb-1">{{ item.name }}</h5>
                    <p class="text-muted mb-0">{{ formatCurrency(item.price) }}</p>
                  </div>
                  <div class="quantity-controls d-flex align-items-center mx-3">
                    <button class="btn btn-outline-secondary btn-sm" 
                            @click="decrementQuantity(item)"
                            :disabled="item.quantity <= 1">−</button>
                    <input type="number" 
                           class="form-control form-control-sm quantity-input mx-2"
                           v-model.number="item.quantity"
                           @change="updateItemQuantity(item)"
                           min="1">
                    <button class="btn btn-outline-secondary btn-sm" 
                            @click="incrementQuantity(item)">+</button>
                  </div>
                  <div class="item-total mx-3">
                    {{ formatCurrency(item.price * item.quantity) }}
                  </div>
                  <button class="btn btn-link text-danger" 
                          @click="cartStore.removeItem(item.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
              <div class="text-center mt-3">
                <router-link to="/" class="btn btn-outline-primary">
                  <i class="bi bi-arrow-left me-2"></i>Return to Shop
                </router-link>
              </div>
            </div>
            <div v-else class="text-center py-4">
              <p class="mb-3">Your cart is empty</p>
              <router-link to="/" class="btn btn-primary">Start Shopping</router-link>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-lg-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Cart Totals</h5>
            <div class="d-flex justify-content-between mb-2">
              <span>Sub Total</span>
              <span>{{ formatCurrency(cartStore.subtotal) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span class="text-success">Free</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Discount (5%)</span>
              <span>-{{ formatCurrency(discount) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Tax (10%)</span>
              <span>{{ formatCurrency(tax) }}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-4">
              <strong>Total</strong>
              <strong>{{ formatCurrency(finalTotal) }}</strong>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Coupon Code</label>
              <div class="input-group">
                <input type="text" 
                       class="form-control" 
                       v-model="couponCode" 
                       placeholder="Enter coupon code">
                <button class="btn btn-outline-primary" 
                        type="button"
                        @click="applyCoupon">
                  Apply Coupon
                </button>
              </div>
            </div>
            
            <button class="btn btn-primary w-100" 
                    @click="proceedToCheckout"
                    :disabled="!cartStore.selectedItems.length">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { formatCurrency } from '../utils/currency'

const cartStore = useCartStore()
const couponCode = ref('')

// Constants for calculations
const TAX_RATE = 0.1 // 10% tax
const DISCOUNT_RATE = 0.05 // 5% discount

// Computed values for cart totals
const discount = computed(() => cartStore.subtotal * DISCOUNT_RATE)
const tax = computed(() => (cartStore.subtotal - discount.value) * TAX_RATE)
const finalTotal = computed(() => cartStore.subtotal - discount.value + tax.value)

function updateItemQuantity(item) {
  const quantity = parseInt(item.quantity) || 1
  cartStore.updateQuantity(item.id, quantity)
}

function incrementQuantity(item) {
  cartStore.updateQuantity(item.id, item.quantity + 1)
}

function decrementQuantity(item) {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.id, item.quantity - 1)
  }
}

function applyCoupon() {
  // Implement coupon logic here
  alert('Coupon applied successfully!')
  couponCode.value = ''
}

function proceedToCheckout() {
  // Implement checkout logic here
  alert('Proceeding to checkout...')
}
</script>

<style scoped>
.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.quantity-input {
  width: 60px;
  text-align: center;
}

.item-total {
  min-width: 100px;
  text-align: right;
}
</style>
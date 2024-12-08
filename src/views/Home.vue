<template>
  <div class="container-fluid bg-light py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h1 class="display-4 mb-3">[Items]</h1>
        <p class="lead text-muted">Find your best match here.</p>
      </div>
      <div class="row g-4">
        <div v-for="item in items" :key="item.id" class="col-md-3">
          <div class="card h-100 shadow-sm">
            <img :src="item.image" class="card-img-top p-3" :alt="item.name">
            <div class="card-body text-center">
              <h5 class="card-title">{{ item.name }}</h5>
              <p class="card-text text-muted">Special Feature</p>
              <p class="card-text"><strong>{{ formatCurrency(item.price) }}</strong></p>
              <router-link :to="'/item/' + item.id" class="btn btn-outline-dark">See More</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { items } from '../data/items'
import { formatCurrency } from '../utils/currency'
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}
.card-img-top {
  height: 200px;
  object-fit: cover;
  background-color: #000;
}
</style>
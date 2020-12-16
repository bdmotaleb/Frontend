<template>
  <div class="row justify-content-center py-5">
    <div class="col-xl-2 col-md-3 col-sm-4" v-for="product in products">
      <div class="product">
        <router-link :to="`/products/details/${product.id}`">
          <img :src="imageViewLink(product.image)" alt="">
          <div class="title">{{ product.title }}</div>
          <div class="price">{{ product.price }}</div>
        </router-link>
      </div>
    </div>
    <div v-if="emptyData()" class="bg-white col-md-12 text-center py-5">
      <h1>Products not found!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    this.$store.dispatch('getProducts');
  },

  computed: {
    products() {
      return this.$store.getters.products
    }
  },
  methods: {
    emptyData() {
      return (this.products.length < 1);
    }
  }
}
</script>

<style scoped>
.product {
  background: #FFF;
  border-radius: 4px;
  margin-bottom: 15px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .05);
  box-sizing: border-box;
}

.product a {
  text-decoration: none;
  color: #353535;
}

.product img {
  border-radius: 5px 5px 0 0;
  width: 100%;
  height: 130px;
}

.product .price, .product .title {
  text-align: center;
}

.product .title {
  font-size: 14px;
  height: 40px;
  overflow: hidden;
  padding: 3px 0;
  line-height: 1.3em;
}
.product .price{
  padding-bottom: 8px;
}
</style>

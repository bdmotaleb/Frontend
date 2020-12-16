<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">Product Details</div>
        <div class="card-body">
          <table class="table">
            <tr>
              <td>Title</td>
              <td>{{ product.title }}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{{ product.price }}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{{ product.description }}</td>
            </tr>
            <tr>
              <td>Image</td>
              <td><img class="img-fluid" style="width: 100px" :src="imageViewLink(product.image)" alt=""></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  data: function () {
    return {
      product: {}
    }
  },
  mounted() {
    this.getProduct();
  },

  methods: {
    getProduct: function () {
      axios.get("http://127.0.0.1:8000/api/products/" + this.$route.params.id).then((response) => {
        this.product = response.data.data;
      }).catch((error) => {
      })
    },
  }
}
</script>

<style scoped>

</style>

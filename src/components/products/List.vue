<template>
  <div class="card">
    <div class="card-header">
      <h4 class="float-left">Manage Products</h4>
      <router-link to="/products/create" class="btn btn-primary float-right">New</router-link>
    </div>
    <div class="card-body">
      <table class="table table-bordered">
        <tr>
          <th>
            <input :disabled="emptyData()" type="checkbox" @click="selectAll" v-model="selectedAll">
          </th>
          <th>Sl No</th>
          <th>Title</th>
          <th>Price</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
        <tr v-for="(product,index) in products">
          <td>
            <input type="checkbox" :value="product.id" v-model="selected">
          </td>
          <td>{{ ++index }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td><img :src="imageViewLink(product.image)" class="img-thumbnail" style="width: 80px" alt=""></td>
          <td>
            <router-link :to="`/products/details/${product.id}`" class="btn btn-info btn-sm">View</router-link>
            <router-link :to="`/products/${product.id}`" class="btn btn-warning btn-sm">Edit</router-link>
            <button type="button" class="btn btn-danger btn-sm" @click="remove(product.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="!emptyData()">
          <td colspan="7">
            <button @click="removeItems(selected)" type="button" :disabled="!isSelected" class="btn btn-danger">Remove</button>
          </td>
        </tr>
        <tr v-if="emptyData()">
          <td colspan="6">
            <h5 class="text-center text-danger">No record found.</h5>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data: function () {
    return {
      selected: [],
      isSelected: false,
      selectedAll: false
    }
  },
  mounted() {
    this.$store.dispatch('getProducts');
  },
  computed: {
    products() {
      return this.$store.getters.products
    }
  },

  watch: {
    selected: function (selected) {
      this.isSelected = (selected.length > 0);
      this.selectedAll = (selected.length === this.products.length);
    }
  },

  methods: {
    emptyData() {
      return (this.products.length < 1);
    },

    selectAll: function (event) {
      if (event.target.checked === false) {
        this.selected = [];
      } else {
        this.products.forEach((product) => {
          if (this.selected.indexOf(product.id) === -1) {
            this.selected.push(product.id);
          }
        });
      }
    },

    removeItems: function (selected) {
      this.confirm(() => {
        axios.post("http://127.0.0.1:8000/api/products/remove-items", { data: selected }).then((response) => {
          this.selected = [];
          this.isSelected = false;
          this.selectedAll = false;
          this.$store.dispatch("getProducts");
          Toast.fire({
            icon: 'success',
            title: response.data.total + ' Product has been successfully deleted!'
          })
        })
      })
    },

    remove: function (id) {
      this.confirm(() => {
        axios.delete("http://127.0.0.1:8000/api/products/" + id).then((response) => {
          this.$store.dispatch("getProducts");
          Swal.fire(
            'Deleted!',
            response.data.message,
            'success'
          )
        })
      });
    },

  }
}
</script>

<style scoped>

</style>

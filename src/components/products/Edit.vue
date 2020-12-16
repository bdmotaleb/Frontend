<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          Update Product
        </div>
        <div class="card-body">
          <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control" id="title" v-model="form.title">
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Price</label>
              <input type="number" class="form-control" id="price" v-model="form.price">
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea type="number" class="form-control" id="description" v-model="form.description"></textarea>
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Image</label>
              <input type="file" id="image" ref="image" @change="loadImage($event)">
              <img v-if="form.image" :src="fileLink(form.image)" alt="" style="width: 80px; height: 80px" class="img-thumbnail">
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data: function () {
    return {
      form: {
        title: '',
        price: '',
        image: '',
        description: ''
      }
    }
  },
  mounted() {
    this.getProduct();
  },

  methods: {
    getProduct: function () {
      axios.get("http://127.0.0.1:8000/api/products/" + this.$route.params.id).then((response) => {
        this.form = response.data.data;
      }).catch((error) => {
      })
    },

    submitForm: function () {
      axios.put('http://127.0.0.1:8000/api/products/' + this.$route.params.id, this.form).then(response => {
        Toast.fire({
          icon: 'success',
          title: response.data.message
        })
      }).catch(error => {
      })
    }
  }
}
</script>

<style scoped>

</style>

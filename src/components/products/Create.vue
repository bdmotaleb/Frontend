<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          Add New Product
        </div>
        <div class="card-body">
          <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" class="form-control" id="title" v-model="form.title" required>
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Price</label>
              <input type="number" class="form-control" id="price" v-model="form.price" required>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea type="number" class="form-control" id="description" v-model="form.description" required></textarea>
            </div>
            <div class="mb-3">
              <label for="image" class="form-label">Image</label>
              <input type="file" id="image" ref="image" @change="loadImage($event)" required>
              <img v-if="form.image" :src="fileLink(form.image)" alt="" style="width: 80px; height: 80px" class="img-thumbnail">
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Create",
  data: function () {
    return {
      form: this.initialForm()
    }
  },
  methods: {
    submitForm: function () {
      axios.post('http://127.0.0.1:8000/api/products', this.form).then(response => {
        this.resetForm();
        Toast.fire({
          icon: 'success',
          title: response.data.message
        })
      }).catch(error => {
      })
    },

    initialForm: function () {
      return {
        title: '',
        price: '',
        image: '',
        description: ''
      }
    },

    /**
     * Reset the form to the default state
     */
    resetForm: function () {
      this.form = this.initialForm();
      this.$refs.image.value = null;
    }
  }
}
</script>

<style scoped>

</style>

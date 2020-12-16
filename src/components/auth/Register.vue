<template>
  <div class="row justify-content-center py-5">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          User Register Panel
        </div>
        <div class="card-body">
          <form @submit.prevent="register">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" v-model="form.name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email" v-model="form.email" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="form.password" required>
            </div>
            <div class="mb-3">
              <label for="password_confirmation" class="form-label">Confirm Password</label>
              <input type="password" class="form-control" id="password_confirmation" v-model="form.password_confirmation" required>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Register",
  data: function () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      error: null
    };
  },
  methods: {

    register: function () {
      axios.post('http://127.0.0.1:8000/api/auth/register', this.form).then(response => {
        this.$router.push('/login')
      }).catch(error => {
      })
    }


  }
}
</script>

<style scoped>

</style>

<template>
  <div class="row justify-content-center py-5">
    <div class="col-md-6">
      <div class="alert alert-danger" v-if="authError">{{ authError }}</div>
      <div class="card">
        <div class="card-header">
          Login Panel
        </div>
        <div class="card-body">
          <form @submit.prevent="authenticate">
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email" v-model="form.email" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" v-model="form.password" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from "../../helpers/auth";

export default {
  name: "login",
  data: function () {
    return {
      form: {
        email: 'admin@gmail.com',
        password: '123456'
      },
      error: null
    };
  },
  methods: {
    authenticate: function () {
      this.$store.dispatch('login');
      login(this.$data.form)
        .then((res) => {
          this.$store.commit("loginSuccess", res);
          this.$router.push({ path: '/' });
        })
        .catch((error) => {
          this.$store.commit("loginFailed", { error });
        });
    }
  },
  computed: {
    authError() {
      return this.$store.getters.authError;
    }
  }
}
</script>

<style scoped>

</style>

import {getLocalUser} from "../helpers/auth";

const user = getLocalUser()

export default {
  state: {
    currentUser: user,
    isLoggedIn: !!user,
    auth_error: null,
    products: []
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    currentUser(state) {
      return state.currentUser;
    },
    authError(state) {
      return state.auth_error;
    },
    products(state) {
      return state.products;
    }
  },
  actions: {
    login(context) {
      context.commit("login");
    },

    getProducts(context) {
      axios.get('http://127.0.0.1:8000/api/products')
        .then((response) => {
          context.commit('updateProducts', response.data.data);
        })
    }
  },
  mutations: {
    login(state) {
      state.auth_error = null;
    },
    loginSuccess(state, payload) {
      state.auth_error = null;
      state.isLoggedIn = true;
      state.currentUser = Object.assign({}, payload.user, { token: payload.token });

      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    loginFailed(state, payload) {
      state.auth_error = payload.error;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    updateProducts(state, payload) {
      state.products = payload;
    }
  }
};

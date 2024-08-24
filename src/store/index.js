import { createStore } from 'vuex'
const URL = 'https://fakestoreapi.com/products';

export default createStore({
  state: {
    products: [],
  },
  getters: {
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },
  },
  actions: {
    async fetchProducts({ state, commit }, { category, price_min, price_max }) {
      try {
        let data = await fetch('https://fakestoreapi.com/products').then(res => res.json());
        if (category != 'all') {
          data = data.filter(item => item.category === category);
        }
        if (price_min) {
          data = data.filter(item => item.price > price_min);
        }
        if (price_max) {
          data = data.filter(item => item.price < price_max);
        }
        commit('SET_PRODUCTS', data)
      } catch (e) {
        console.error(e);
      }
    },


  },
})

import { createStore } from 'vuex'
const URL = 'https://fakestoreapi.com/products';

export default createStore({
  state: {
    products: [],
    cart: []
  },
  getters: {
    // Счетчик товаров в корзине
    cartItemCount(state) {
      return state.cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    },
    // Получение количество товара в корзине по id
    getCartItemCount: (state) => (itemId) => {
      const item = state.cart.find(cartItem => cartItem.id === itemId);
      return item ? item.quantity : 0;
    }
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },
    // Добавление товара в корзину
    ADD_TO_CART(state, item) {
      const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    // Удаление товара из корзины
    REMOVE_FROM_CART(state, item) {
      const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter(cartItem => cartItem.id !== item.id);
        }
      }
    },
    // Очищаем корзину
    CLEAR_CART(state) {
      state.cart = [];
    }
  },
  actions: {
    // Получение товаров в каталог
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

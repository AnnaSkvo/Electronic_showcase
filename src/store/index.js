import { createStore } from 'vuex'

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

        /*---------------- Тестовые данные (когда сервер fakestoreapi падает) ----------------*/
        /*let data = [
          {
            id: 1, title: 'Свитер', category: "men's clothing", price: 100.50, rating: { rate: 4.3 }, image: "https://studio-yusupova.ru/wp-content/uploads/2022/12/DSC05303-131.jpg"
          },
          {
            id: 2, title: 'Футболка', category: "men's clothing", price: 50.34, rating: { rate: 3.3 }, image:"https://fabricafutbolok.ru/wp-content/uploads/futbolka-direktor-belaya.jpg"
          },
          {
            id: 3, title: 'Кольцо', category: "jewelery", price: 78.13, rating: { rate: 4.8 }, image:"https://lavivion.ru/upload/image/4U2868-PR-Koltso-iz-belogo-zolota-s-brilliantom_1.webp"
          },
          {
            id: 4, title: 'Цепочка', category: "jewelery", price: 118.60, rating: { rate: 4.0 }, image:"https://ir.ozone.ru/s3/multimedia-s/c1000/6430561324.jpg"
          },
          {
            id: 5, title: 'Телевизор', category: "electronics", price: 500, rating: { rate: 4.5 }, image:"https://tech-iq.ru/wp-content/uploads/2022/01/88.png"
          },
          {
            id: 6, title: 'Телефон', category: "electronics", price: 615.88, rating: { rate: 3.8 }, image:"https://bitrix.wbs24.ru/upload/iblock/280/mse52lkmg2fiym9lpm826z66pcmoaecl.jpeg"
          },
          {
            id: 7, title: 'Топ', category: "women's clothing", price: 15.10, rating: { rate: 2.1 }, image:"https://cdn1.ozone.ru/s3/multimedia-b/6714152867.jpg"
          },
          {
            id: 8, title: 'Юбка', category: "women's clothing", price: 43, rating: { rate: 4.0 }, image:"https://donna-saggia.ru/upload/iblock/821/82119c1e02b4b0a929d0576755ad113d.jpg"
          }
        ]*/
        /*----------------------------------------------*/

        if (category != 'all') {
          data = data.filter(item => item.category === category);
        }
        if (price_min) {
          data = data.filter(item => item.price > price_min);
        }
        if (price_max) {
          data = data.filter(item => item.price < price_max);
        }
        commit('SET_PRODUCTS', data);
      } catch (e) {
        console.error(e);
      }
    },
  },
})

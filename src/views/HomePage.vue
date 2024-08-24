<template>
  <header>
    <div class="headerline">
      <HeaderLine>
        <template #navigate>
          <div class="headerline__logo" @click="$router.push({ name: 'home' })">
            <IconComponent name="IconLogo" />
          </div>
          <div class="headerline__cart">
            <div class="cart" @click="$router.push({ name: 'cart' })">
              <IconComponent name="IconCart" />
            </div>
          </div>
        </template>
      </HeaderLine>
    </div>
  </header>
  <main>
    <div class="filter">

      <p class="filter__desc">Категория</p>
      <select class="filter__select" v-model="filter.category">
        <option v-for="option in categoryOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
      </select>

      <p class="filter__desc">Цена</p>
      <input v-model="filter.price_min" type="number" class="filter__input" placeholder="От">
      <input v-model="filter.price_max" type="number" class="filter__input" placeholder="До">

      <button class="filter__btn" @click="resetFilter()">Сброс</button>
      <button class="filter__btn" @click="applyFilter()">Применить</button>

    </div>
    <div class="product">
      <ul class="product__list">
        <li class="product__card" v-for="item in products" :key="item.id">
          <div class="product__container">
            <ProductCard>

              <template #img>
                <img :src="item.image" :alt="item.title" class="product__img">
              </template>

              <template #description>
                <h1 class="product__title" :title="item.title">{{ item.title }}</h1>
                <div class="product__rating">
                  <RatingComponent :rating="item.rating" />
                </div>
                <p class="product__price">{{ item.price }}$</p>
              </template>

              <!-- <template #button>
                <ButtonCartComponent :item="item" />
              </template>-->
            </ProductCard>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>

import HeaderLine from '@/components/HeaderLine.vue'
import IconComponent from '@/icons/IconComponent.vue'
import ProductCard from '@/components/ProductCard.vue'
import RatingComponent from '@/components/RatingComponent.vue'

export default {
  name: 'HomePage',
  components: {
    HeaderLine,
    IconComponent,
    ProductCard,
    RatingComponent,
  },
  data() {
    return {
      filter: {
        category: 'all',
        price_min: '',
        price_max: '',
      },
      categoryOptions: [
        { value: 'all', text: 'Все товары' },
        { value: "men's clothing", text: "Мужская одежда" },
        { value: 'jewelery', text: 'Украшения' },
        { value: 'electronics', text: 'Электроника' },
        { value: "women's clothing", text: "Женская одежда" }
      ]
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  methods: {
    //Фейковая проверка, что пользователь авторизован
    getAuth() {
      if (localStorage.getItem('token') != '123Skvo!*') {
        this.$router.replace({ name: "auth" });
      } else {
        this.fetchProducts();
      }
    },
    // Загрузка товаров на страницу
    fetchProducts() {
      this.$store.dispatch('fetchProducts', this.filter);
    },
    // Метод применения фильтра
    applyFilter() {
      this.fetchProducts();
    },
    // Метод сброса фильтра
    resetFilter() {
      this.filter = { ...this.filter, category: 'all', price_min: '', price_max: '' }
      this.fetchProducts();
    },
  },
  mounted() {
    this.getAuth();
  }
}
</script>

<style scoped>
.headerline {
  background-color: #FAFAFA;
  border-bottom: 1px solid #eeeeee;
}

.headerline__logo {
  width: 100px;
  height: 100px;
  color: #5e5f5f;
  cursor: pointer;
}

.headerline__cart {
  width: 50px;
  height: 50px;
  color: #5e5f5f;
}

main {
  display: flex;
  justify-content: flex-start;
  height: calc(100vh - 100px);
  margin-left: 18%;
}

.filter {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.filter__select {
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #5e5f5f;
  padding: 10px 24px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}

.filter__select:not([multiple]) {
  background-repeat: no-repeat;
  background-position: 90% 50%;
  background-size: 0.85em auto;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cpath d='M70.3 13.8L40 66.3 9.7 13.8z' fill='%23000'%3E%3C/path%3E%3C/svg%3E");
}


.filter__input {
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #5e5f5f;
  padding: 10px 24px;
}

.filter__btn {
  background: #5e5f5f;
  color: #fff;
  align-items: center;
  padding: 10px 24px;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
}

.filter__btn:hover {
  background: gray;
}

.product {
  width: 80%;
  overflow-y: auto;
}

.product__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  width: 100%;
  max-width: 1000px;
  justify-content: center;
  justify-items: center;
  column-gap: 20px;
  row-gap: 40px;
  margin: 40px auto 40px 0;
}

.product__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product__title {
  height: 44px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 44px;
}

.product__rating {
  display: flex;
}
</style>

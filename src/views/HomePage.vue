<template>
  <header>
    <HeaderLine />
  </header>
  <main>
    <div class="x-container">
      <div class="filter">

        <p class="filter__desc">Сортировка по</p>
        <div class="filter__sort">
          <select class="filter__select-light" v-model="sortParameter">
            <option value="name">Наименованию</option>
            <option value="price">Цене</option>
            <option value="rating">Рейтингу</option>
          </select>

          <select class="filter__select-light" v-model="sortOrder">
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </div>

        <hr>

        <h1 class="filter__title">Фильтр:</h1>
        <p class="filter__desc">Категория</p>
        <select class="filter__select" v-model="filter.category">
          <option v-for="option in categoryOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
        </select>

        <p class="filter__desc">Цена</p>
        <input v-model="filter.price_min" type="number" class="filter__input" placeholder="От">
        <input v-model="filter.price_max" type="number" class="filter__input" placeholder="До">

        <ButtonComponent class="filter__btn" @click="resetFilter()" text="Сброс" />
        <ButtonComponent class="filter__btn" @click="applyFilter()" text="Применить" />

      </div>
      <div class="product">
        <ul class="product__list">
          <li class="product__card" v-for="item in sortedProducts" :key="item.id">
            <div class="product__container">
              <ProductCard>
                <template #img>
                  <img :src="item.image" :alt="item.title" class="product__img" @click="openImg(item.image)">
                </template>
                <template #description>
                  <h1 class="product__title" :title="item.title">{{ item.title }}</h1>
                  <div class="product__options">
                    <p class="product__price">{{ item.price.toFixed(2) }}$</p>
                    <div class="product__rating">
                      <RatingComponent :rating="item.rating" />
                    </div>
                  </div>
                </template>
                <template #button>
                  <ButtonCartComponent :item="item" />
                </template>
              </ProductCard>
            </div>
          </li>
        </ul>
      </div>

      <!-- Модальное окно вывода ошибки при фильтрации -->
      <ModalComponent :visible="modalVisible"
        message="Максимальная цена не может быть меньше минимальной. Фильтр не будет применен."
        @close="handleModalClose" />

      <!-- Модальное окно изображения на весь экран -->
      <ModalImg v-if="selectedImage" :selectedImage="this.selectedImage" @closeImg="closeImg" />
    </div>
  </main>
</template>

<script>

import HeaderLine from '@/components/HeaderLine.vue'
import IconComponent from '@/icons/IconComponent.vue'
import ProductCard from '@/components/ProductCard.vue'
import RatingComponent from '@/components/RatingComponent.vue'
import ButtonCartComponent from '@/components/ButtonCartComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import ModalImg from '@/components/ModalImg.vue'

export default {
  name: 'HomePage',
  components: {
    HeaderLine,
    IconComponent,
    ProductCard,
    RatingComponent,
    ButtonCartComponent,
    ButtonComponent,
    ModalComponent,
    ModalImg
  },
  data() {
    return {
      sortParameter: 'name',
      sortOrder: 'asc',
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
      ],
      modalVisible: false,
      selectedImage: null,
    };
  },
  computed: {
    // Получение товаров для каталога
    products() {
      return this.$store.state.products;
    },
    // Получение отсортированных товаров
    sortedProducts() {
      let sortedArray = this.products.sort((a, b) => {
        let comparison = 0;

        if (this.sortParameter === 'name') {
          comparison = a.title.localeCompare(b.title);
        } else if (this.sortParameter === 'price') {
          comparison = a.price - b.price;
        } else if (this.sortParameter === 'rating') {
          comparison = a.rating.rate - b.rating.rate;
        }

        return this.sortOrder === 'asc' ? comparison : -comparison; // Изменяем порядок сортировки
      });
      return sortedArray;
    },
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
      // Проверка, что максимальная цена не меньше минимальной
      if (this.filter.price_max < this.filter.price_min) {
        // Открываем модальное окно
        this.modalVisible = true;
        return;
      }
      this.fetchProducts();
    },
    // Метод сброса фильтра
    resetFilter() {
      this.filter = { ...this.filter, category: 'all', price_min: '', price_max: '' }
      this.fetchProducts();
    },
    // Скрыть модальное окно
    handleModalClose() {
      this.modalVisible = false;
    },
    // Открыть модалку с картинкой
    openImg(image) {
      this.selectedImage = image;
    },
    // Закрыть модалку с картинкой
    closeImg() {
      this.selectedImage = null;
    },
  },
  mounted() {
    this.getAuth();
  }
}
</script>

<style scoped>
main {
  overflow-y: auto;
}

.x-container {
  display: flex;
  justify-content: flex-start;
  height: calc(100vh - 100px);
}

.filter {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.filter__sort {
  display: flex;
  justify-content: space-between;
}

.filter__title {
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  margin-top: 10px;
}

.filter__desc {
  margin: 10px 0;
}

.filter__select {
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

.filter__select-light {
  border: none;
  padding: 0;
  margin-bottom: 10px;
}

.filter__select-light:focus {
  outline: none;
}

.filter__input {
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #5e5f5f;
  padding: 10px 24px;
}

.filter__btn {
  margin-bottom: 20px;
}

.product {
  width: 80%;
}

.product__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 260px);
  width: 100%;
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
  cursor: pointer;
}

.product__title {
  height: 44px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 44px;
}

.product__options {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.product__rating {
  display: flex;
  align-items: center;
}

@media (max-width: 1700px) {
  .x-container {
    justify-content: space-between;
  }

  .filter {
    width: 30%;
  }

  .filter__sort {
    flex-direction: column;
    justify-content: center;
  }

  .product {
    width: 70%;
  }

  .product__list {
    grid-template-columns: repeat(auto-fill, 230px);
  }
}

@media (max-width: 1400px) {
  .filter {
    margin-left: 10px;
    width: 25%;
  }
  .product__list {
    grid-template-columns: repeat(auto-fill, 150px);
  }
}

@media (max-width: 900px) {
  .x-container {
    display: block;
  }

  .filter {
    width: 100%;
  }

  .product {
    width: 100%;
  }

  .product__list {
    grid-template-columns: repeat(auto-fill, 150px);
  }
}

@media (max-width: 410px) {
  .product__list {
    grid-template-columns: repeat(auto-fill, 110px);
  }
}

@media (max-height: 620px) {
  .filter {
    justify-content: start;
  }
}
</style>

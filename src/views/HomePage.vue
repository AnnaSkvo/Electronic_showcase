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
  <main class="x-container">
    <div class="filter">

      <p class="filter__desc">Категория</p>
      <select class="filter__select" v-model="filter.category">
        <option value="all">Все товары</option>
        <option value="men's clothing">Мужская одежда</option>
        <option value="jewelery">Украшения</option>
        <option value="electronics">Электроника</option>
        <option value="women's clothing">Женская одежда</option>
      </select>

      <p class="filter__desc">Цена</p>
      <input v-model="filter.price_min" type="number" class="filter__input" placeholder="От">
      <input v-model="filter.price_max" type="number" class="filter__input" placeholder="До">

      <button class="filter__btn filter__btn-reset">Сброс</button>
      <button class="filter__btn filter__btn-apply">Применить</button>

    </div>
    <div class="products">
      cards
      Фильтры {{ filter }}
    </div>
  </main>
</template>

<script>

import HeaderLine from '@/components/HeaderLine.vue'
import IconComponent from '@/icons/IconComponent.vue'

export default {
  name: 'HomePage',
  components: {
    HeaderLine,
    IconComponent,
  },
  data() {
    return {
      filter: {
        category: 'all',
        price_min: '',
        price_max: '',

      }
    };
  },
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
}

.filter {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
}

.filter__select, .filter__input{
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

.products {
  width: 80%;
  background-color: aquamarine;
}
</style>

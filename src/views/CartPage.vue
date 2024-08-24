<template>
  <header>
    <HeaderLine />
  </header>
  <main>
    <div v-if="totalCartItemCount == 0" class="content">
      <h1 class="content__text">Корзина пуста</h1>
      <ButtonComponent class="filter__btn" @click="$router.push({ name: 'home' })" text="Вернуться к покупкам" />
    </div>
    <div v-else>
      <h1 class="content__text">Товары в корзине</h1>
      <CartTable />
      <div class="footer x-container">
        <p class="footer__text">Всего товаров {{ totalCartItemCount }} на сумму {{ totalPrice }}$</p>
        <ButtonComponent @click="makeOrder()" text="Оформить заказ" />
      </div>
    </div>
    <ModalComponent :visible="modalVisible" :message="modalMessage" @close="handleModalClose" />
  </main>
</template>

<script>
import HeaderLine from '@/components/HeaderLine.vue'
import IconComponent from '@/icons/IconComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import CartTable from '@/components/CartTable.vue'
import ModalComponent from '@/components/ModalComponent.vue'

export default {
  name: 'CartPage',
  components: {
    HeaderLine,
    IconComponent,
    ButtonComponent,
    CartTable,
    ModalComponent
  },
  data() {
    return {
      modalVisible: false,
      modalMessage: "Заказ оформлен!"
    };
  },
  computed: {
    // Получение общего количества товаров 
    totalCartItemCount() {
      return this.$store.getters.cartItemCount;
    },
    // Получение суммы товаров
    totalPrice() {
      return this.$store.state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
  },
  methods: {
    makeOrder() {
      // Открываем модальное окно
      this.modalVisible = true;

      // Очищаем корзину.
      this.$store.commit('CLEAR_CART');
    },
    // Скрыть модальное окно
    handleModalClose() {
      this.modalVisible = false;
      this.$router.push({ name: 'home' });
    }
  }
}
</script>

<style scoped>
main {
  height: calc(100vh - 100px);
  overflow-y: auto;
}

.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content__text {
  font-size: 18px;
  font-weight: 700;
  padding: 20px;
}

.footer {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 10px 0;
}

.footer__text {
  font-size: 18px;
  font-weight: 700;
  padding: 20px;
}
</style>

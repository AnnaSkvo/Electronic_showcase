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
              <span v-if="totalCartItemCount != 0" class="cart__count">{{ totalCartItemCount }}</span>
            </div>
          </div>
        </template>
      </HeaderLine>
    </div>
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
  position: relative;
  cursor: pointer !important;
}

.headerline__cart:hover,
.headerline__logo:hover {
  filter: drop-shadow(2px 3px 5px black);
}

.headerline__cart:active,
.headerline__logo:active {
  filter: none;
}

.cart__count {
  position: absolute;
  top: 0;
  right: 0px;
  border-radius: 10px;
  background: #5e5f5f;
  padding: 3px;
  color: white;
  width: 22px;
  height: 22px;
  font-size: 12px;
}

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

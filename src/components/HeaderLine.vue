<template>
  <div class="headerline">
    <div class="x-container">
      <div class="navigate">
          <div class="headerline__logo" @click="$router.push({ name: 'home' })">
            <IconComponent name="IconLogo" />
          </div>
          <div class="headerline__cart">
            <div class="cart" @click="$router.push({ name: 'cart' })">
              <IconComponent name="IconCart" />
              <span v-if="totalCartItemCount != 0" class="cart__count">{{ totalCartItemCount }}</span>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconComponent from '@/icons/IconComponent.vue'

export default {
  name: 'HeaderLine',
  components: {
    IconComponent,
  },
  computed:{
    // Получение общего количества товаров 
    totalCartItemCount() {
      return this.$store.getters.cartItemCount;
    }
  }
}
</script>

<style scoped>
.navigate {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.headerline {
  background-color: #FAFAFA;
  border-bottom: 1px solid #eeeeee;
}

.headerline__logo {
  width: 100px;
  height: 100px;
  color: #5e5f5f;
  cursor: pointer;
  transition: filter .2s;
}

.headerline__cart {
  width: 50px;
  height: 50px;
  color: #5e5f5f;
  position: relative;
  cursor: pointer;
  transition: filter .2s;
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
</style>
<template>
  <header>
    <div class="headerline">
      <HeaderLine>
        <template #navigate>
          <div class="logo" @click="$router.push({ name: 'home' })">
            <IconComponent name="IconLogo" />
          </div>
          <div class="rightmenu">
            <div class="cart" @click="$router.push({ name: 'cart' })">
              <IconComponent name="IconCart" />
            </div>
          </div>
        </template>
      </HeaderLine>
    </div>
  </header>
  <main>
    Главная
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
  }
}
</script>

<style scoped>

.logo {
  width: 132px;
  height: 132px;
  color: red;
}
.cart{
  width: 132px;
  height: 132px;
  color: red;
}

</style>

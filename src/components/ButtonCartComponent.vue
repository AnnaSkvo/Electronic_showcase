<template>
    <div v-if="itemCount == 0">
        <ButtonComponent @click="addToCart()" text="Добавить в корзину" />
    </div>
    <div v-else>
        <div class="container">
            <ButtonComponent @click="actionToCart('-')" text="-" />
            <p class="container__count"> {{ itemCount }}</p>
            <ButtonComponent @click="actionToCart('+')" text="+" />
        </div>
    </div>
</template>

<script>

import ButtonComponent from '@/components/ButtonComponent.vue'

export default {
    name: 'ButtonCartComponent',
    components: {
        ButtonComponent
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        // Получаем количество товара в корзине 
        itemCount() {
            return this.$store.getters.getCartItemCount(this.item.id);
        }
    },
    methods: {
        // Первичный клик по кнопке добавления в корзину
        addToCart() {
            this.count++
            this.$store.commit('ADD_TO_CART', this.item);
        },
        // Действия + и -
        actionToCart(action) {
            if (action == '-') {
                this.count--;
                this.$store.commit('REMOVE_FROM_CART', this.item);
            } else {
                this.count++;
                this.$store.commit('ADD_TO_CART', this.item);
            }
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.container__count {
    width: 50px;
}
</style>
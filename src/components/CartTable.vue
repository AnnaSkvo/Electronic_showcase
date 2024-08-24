<template>
    <div class="x-container">
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Изображение</th>
                    <th>Наименование</th>
                    <th>Количество</th>
                    <th>Цена за единицу</th>
                    <th>Общая цена</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in this.$store.state.cart" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                        <img :src="item.image" :alt="item.title" class="image" />
                    </td>
                    <td>{{ item.title }}</td>
                    <td>
                        <div class="quantity">
                            <ButtonComponent @click="updateQuantity(item, -1)" text="-" />
                            <p class="quantity__count">{{ item.quantity }}</p>
                            <ButtonComponent @click="updateQuantity(item, 1)" text="+" />
                        </div>
                    </td>
                    <td>{{ item.price }}$</td>
                    <td>{{ item.price * item.quantity }}$</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue'

export default {
    name: 'CartTable',
    components: {
        ButtonComponent
    },
    methods: {
        updateQuantity(item, change) {
            if (change === 1) {
                this.$store.commit('ADD_TO_CART', item);
            } else if (change === -1) {
                this.$store.commit('REMOVE_FROM_CART', item);
            }
        }
    }
}
</script>

<style>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
}

.image {
    width: 50px;
    height: auto;
}

.quantity{
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.quantity__count {
    width: 50px;
}

</style>
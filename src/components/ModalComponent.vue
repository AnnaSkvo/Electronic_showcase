<template>
    <div v-if="visible" class="modal">
        <div class="modal__content">
            <h2 class="modal__text">{{ message }}</h2>
            <ButtonComponent @click="close" text="Закрыть" />
        </div>
    </div>
</template>

<script>
import ButtonComponent from '@/components/ButtonComponent.vue'

export default {
    name: "ModalComponent",
    emits: ['close'],
    components: {
        ButtonComponent
    },
    props: {
        message: {
            type: String,
            default: "Заказ оформлен!"
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit("close");
        }
    }
}
</script>

<style>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal__content {
    background: white;
    padding: 20px;
    border-radius: 5px;
}

.modal__text {
    font-size: 18px;
    font-weight: 700;
    padding: 20px;
}
</style>
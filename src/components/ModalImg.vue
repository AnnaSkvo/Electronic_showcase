<template>
    <div class="modal" @click.self="closeImg">
        <img :src="this.selectedImage" class="modal__image" />
        <button class="modal__close" @click="closeImg">X</button>
    </div>
</template>
<script>

export default {
    name: "ModalImg",
    emits: ['closeImg'],
    props: {
        selectedImage: {
            type: String,
            default: false
        }
    },
    methods: {
        closeImg() {
            this.$emit("closeImg");
        }
    }
}
</script>

<style>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal__image {
    max-width: 90%;
    max-height: 90%;
}

.modal__close {
    position: absolute;
    border-radius: 10px;
    top: 20px;
    right: 20px;
    background: white;
    border: none;
    padding: 10px 18px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    transition: background .2s;
}

.modal__close:hover{
    background: #dddddd;
}
</style>
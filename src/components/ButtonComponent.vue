<template>
    <button class="btn">{{ this.text }}</button>
</template>

<script>
export default {
    name: 'ButtonComponent',
    props: {
        text: {
            type: String,
            required: true
        }
    },
}
</script>

<style scoped>
.btn {
    background: #5e5f5f;
    color: #fff;
    align-items: center;
    padding: 10px 18px;
    border-radius: 10px;
    cursor: pointer;
    transition: background .2s;
}

.btn:hover {
    background: gray;
}

@media (max-width: 410px) {
    .btn {
        padding: 4px 8px;
    }
}
</style>
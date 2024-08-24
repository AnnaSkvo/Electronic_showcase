<template>
    <div class="card">
        <div class="card__img">
            <slot name="img"></slot>
        </div>
        <div class="card__description">
            <slot name="description"></slot>
        </div>
        <div class="card__button">
            <slot name="button"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
}
</script>

<style scoped>
.card {
    width: 200px;
    height: 300px;
    border: 1px solid #f1f1f1;
    box-shadow: 0px 0px 20px #f1f1f1;
    border-radius: 10px;
    padding: 24px 20px;
    transition: box-shadow .2s;
}

.card:hover {
    box-shadow: 0px 0px 20px #d1d1d1;
}

.card__img {
    width: 100%;
    height: 50%;
}

.card__description {
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    text-align: left;
}
</style>
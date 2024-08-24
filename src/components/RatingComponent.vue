<template>
    <div class="img">
        <IconComponent name="IconStar" />
    </div>
    <p class="product__price">{{ this.rating.rate }}</p>
</template>

<script>

import IconComponent from '@/icons/IconComponent.vue'

export default {
    name: 'RatingComponent',
    components: {
        IconComponent
    },
    props: {
        rating: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped>
.img {
    width: 18px;
    height: 18px;
}
</style>
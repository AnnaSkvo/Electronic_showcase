<template>
    <div class="notfound">
        <span class="notfound__title">Страница не найдена</span>
        <h1 class="notfound__num">404</h1>
        <div class="notfound__img">
            <IconComponent name="IconSadCat" />
        </div>
    </div>
</template>

<script>
import IconComponent from '@/icons/IconComponent.vue'

export default {
    name: 'notFound',
    components: {
        IconComponent,
    },
}
</script>

<style scoped>
.notfound {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.notfound__title {
    font-size: 18px;
    font-weight: 700;
    margin-top: 10px;
}

.notfound__num {
    font-size: 22px;
    font-weight: 700;
    margin-top: 10px;
}

.notfound__img {
    height: 100px;
    width: 100px;
}
</style>
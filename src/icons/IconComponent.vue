<template>
    <component :is="name" />
</template>

<script>

import * as icons from './elements_icons'

export default {
    name: 'IconComponent',
    components: {
        ...icons
    },
    props: {
        name: {
            type: String,
            required: true,
            validator(value) {
                return Object.keys(icons).includes(value)
            }
        }
    }
}
</script>
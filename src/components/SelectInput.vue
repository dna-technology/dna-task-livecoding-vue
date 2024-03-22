<template>
    <select v-model="selected">
    <option v-for="option in otpionsWithBlank" :value="option[idProperty]" :key="option[idProperty]">
      {{ option[nameProperty] }}
    </option>
</select>

</template>

<script setup lang="ts">
import { defineModel, defineProps, computed, withDefaults } from 'vue'

//@TODO maybe typing could be improved for options that it includes 
// idProperty an nameProperty
export interface Props {
  options: Record<string, any>[]
  idProperty?: string
  nameProperty?: string
  blankOptionText?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  idProperty: 'id',
  nameProperty: 'name',
  blankOptionText: 'Empty'
})

const selected = defineModel({ default: '' })

const otpionsWithBlank = computed(() => {
  return [{ [props.idProperty]: '', [props.nameProperty]: props.blankOptionText, }, ...props.options]
})
</script>
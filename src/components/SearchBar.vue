<script setup lang="ts">
import { computed } from 'vue'

import { useItemsStore } from '@/stores/items'

import CancelIcon from '@/components/icons/CancelIcon.vue'
import AddIcon from '@/components/icons/AddIcon.vue'

const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    hasExactMatch: {
      type: Boolean,
      default: false
    }
  }),
  itemsStore = useItemsStore()

const emit = defineEmits(['update:modelValue'])

const searchQuery = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  }),
  isEmptyQuery = computed(() => {
    return searchQuery.value === ''
  })

const clearQuery = () => {
  searchQuery.value = ''
}

const addItem = () => {
  if (isEmptyQuery.value || props.hasExactMatch) {
    return
  }

  itemsStore.addItem(searchQuery.value)
  clearQuery()
}
</script>

<template>
  <div :class="$style['search-container']" @keydown.esc="clearQuery" @keydown.enter="addItem">
    <input
      v-model="searchQuery"
      type="text"
      :class="$style['search-input']"
      placeholder="Search or Add..."
    />
    <div v-if="!isEmptyQuery" :class="$style['search-buttons']">
      <button class="button button-circular button-red-500 hover-pointer" @click="clearQuery">
        <CancelIcon></CancelIcon>
      </button>
      <button
        :disabled="hasExactMatch"
        class="button button-circular button-blue-500 hover-pointer"
        @click="addItem"
      >
        <AddIcon></AddIcon>
      </button>
    </div>
  </div>
</template>

<style lang="scss" module>
@use '@/sass/color.scss';

.search {
  &-container {
    min-width: 50%;
    position: relative;
    top: 0;
  }

  &-input {
    width: 100%;
    color: color.$text;
    background-color: color.$bg-input;
    border: none;
    border-radius: 0.357rem;
    padding: 1.679rem 1.071rem;

    &::placeholder {
      color: color.$placeholder;
      opacity: 1;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &-buttons {
    position: absolute;
    display: flex;
    gap: 0.75rem;
    top: 0.5rem;
    right: 0.5rem;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>

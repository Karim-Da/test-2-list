<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

import { SortKey } from '@/types/item'

const emit = defineEmits(['update-sort'])

const sortByKey = ref(SortKey.VALUE),
  STORAGE_KEY = 'sort_by_key'

const updateSortByKey = (sortKey: SortKey) => {
  sortByKey.value = sortKey || SortKey.VALUE
  emit('update-sort', sortByKey.value)
  localStorage.setItem(STORAGE_KEY, sortByKey.value)
}

onBeforeMount(() => {
  const sortByKeyFromStorage = localStorage.getItem(STORAGE_KEY),
    sortKey = sortByKeyFromStorage === SortKey.VALUE ? SortKey.VALUE : SortKey.CREATED_AT

  updateSortByKey(sortKey)
})
</script>

<template>
  <div class="mt-15" :class="$style['sort-container']">
    <div
      @click="updateSortByKey(SortKey.VALUE)"
      :class="[$style['sort-item'], sortByKey === SortKey.VALUE ? $style.active : '']"
    >
      <span>Sort by</span> Value
    </div>
    <div
      @click="updateSortByKey(SortKey.CREATED_AT)"
      class="mt-5"
      :class="[$style['sort-item'], sortByKey === SortKey.CREATED_AT ? $style.active : '']"
    >
      <span>Sort by</span> Date
    </div>
  </div>
</template>

<style lang="scss" module>
@use '@/sass/color.scss';

.sort {
  &-container {
    padding-right: 2.857rem;
    padding-left: 4.286rem;
  }

  &-item {
    background-color: transparent;
    padding: 0.857rem 1rem;

    & span {
      color: color.$text-secondary;
    }
  }
}

.active {
  position: relative;
  background-color: color.$bg-white;

  &::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    top: 1.286rem;
    right: 1.286rem;
    border-radius: 50%;
    background-color: color.$green-500;
  }
}
</style>

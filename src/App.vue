<script setup lang="ts">
import { ref, computed, onBeforeMount, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'

import { useItemsStore } from '@/stores/items'

import { getItemsFromStorage, setItemsToStorage } from '@/helpers/localStorage'

import SearchBar from '@/components/SearchBar.vue'
import BaseList from '@/components/list/BaseList.vue'

const itemsStore = useItemsStore(),
  { items } = storeToRefs(itemsStore),
  searchQuery = ref('')

const hasExactMatch = computed(() => {
  return items.value
    .map((i) => i.value.toLocaleLowerCase())
    .includes(searchQuery.value.toLocaleLowerCase())
})

const STORAGE_KEY = 'items'

const saveItems = () => {
  setItemsToStorage(STORAGE_KEY, itemsStore.items)
}

onBeforeMount(() => {
  const items = getItemsFromStorage(STORAGE_KEY)
  itemsStore.init(items)
  window.addEventListener('beforeunload', saveItems)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', saveItems)
})
</script>

<template>
  <div class="flex">
    <SearchBar v-model="searchQuery" :has-exact-match="hasExactMatch" class="mx-auto"></SearchBar>
  </div>
  <BaseList class="mt-10" :search-query="searchQuery"></BaseList>
</template>

<style lang="scss" module></style>

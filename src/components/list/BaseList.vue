<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useItemsStore } from '@/stores/items'
import { SortKey } from '@/types/item'

import ListItem from '@/components/list/ListItem.vue'
import ListControls from '@/components/list/ListControls.vue'

const props = defineProps({
    searchQuery: {
      type: String,
      required: true
    }
  }),
  itemsStore = useItemsStore(),
  { items } = storeToRefs(itemsStore),
  sortByKey = ref(SortKey.VALUE),
  listRefreshKey = ref('')

const sortedItems = computed(() => {
  return items.value
    .filter(
      (i) =>
        props.searchQuery === '' || i.value.toLowerCase().includes(props.searchQuery.toLowerCase())
    )
    .sort((itemA, itemB) => {
      if (sortByKey.value === SortKey.VALUE) {
        const valA = itemA[SortKey.VALUE],
          valB = itemB[SortKey.VALUE]
        return valA.localeCompare(valB)
      }

      const dateA = itemA[SortKey.CREATED_AT],
        dateB = itemB[SortKey.CREATED_AT]

      let res = 0
      if (dateA > dateB) {
        res = -1
      } else if (dateA < dateB) {
        res = 1
      }

      return res
    })
})

const updatedSortKey = (sortKey: SortKey) => {
  sortByKey.value = sortKey || SortKey.VALUE
}

let counter = 0

const refresh = () => {
  counter = (counter + 1) % 1000
  listRefreshKey.value = 'list-refresh-key-' + counter
  setTimeout(refresh, 5000)
}

onMounted(() => {
  refresh()
})
</script>

<template>
  <div class="flex row-reverse">
    <div :class="$style['list-controls']">
      <ListControls @update-sort="updatedSortKey"></ListControls>
    </div>
    <div :class="$style['list-items-container']" :key="listRefreshKey">
      <div :class="$style['list-item']" v-for="item in sortedItems" :key="item.id">
        <ListItem
          :item="item"
          :is-exact-match="item.value.toLocaleLowerCase() === searchQuery.toLocaleLowerCase()"
        ></ListItem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
@use '@/sass/color.scss';

.list {
  &-controls {
    min-width: 25%;
  }

  &-items-container {
    min-width: 50%;
  }

  &-item {
    &:not(:last-child) {
      border-bottom: 1px solid color.$separator;
    }

    &:hover {
      background-color: color.$bg-white;
    }
  }
}
</style>

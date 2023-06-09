import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Item } from '@/types/item'

export const useItemsStore = defineStore('items', () => {
  const items = ref(new Array<Item>())

  const getNextId = () => {
    const currentMaxId = items.value.reduce((a, b) => Math.max(a, b.id), 0)
    return currentMaxId + 1
  }

  const init = (itemsToAdd: Item[]) => {
    items.value = new Array<Item>()
    items.value.push(...itemsToAdd)
  }

  const addItem = (value: string) => {
    items.value.push({
      id: getNextId(),
      value,
      created_at: Date.now()
    })
  }

  const deleteItem = (idToDelete: number) => {
    items.value = items.value.filter((item) => item.id !== idToDelete)
  }

  return { items, init, addItem, deleteItem }
})

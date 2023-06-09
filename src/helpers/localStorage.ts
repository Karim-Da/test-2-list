import type { Item } from '@/types/item'

export const setItemsToStorage = (key: string, items: Item[]) => {
  localStorage.setItem(key, JSON.stringify(items))
}

export const getItemsFromStorage = (key: string): Item[] => {
  const itemsJSON = localStorage.getItem(key)

  return itemsJSON ? JSON.parse(itemsJSON) : new Array<Item>()
}

<script setup lang="ts">
import { ref } from 'vue'
import { formatDistance } from 'date-fns'
import { useItemsStore } from '@/stores/items'

import TrashIcon from '@/components/icons/TrashIcon.vue'
import CheckIcon from '@/components/icons/CheckIcon.vue'

const props = defineProps({
    item: {
      type: Object,
      required: true
    },
    isExactMatch: {
      type: Boolean,
      default: false
    }
  }),
  itemsStore = useItemsStore(),
  isHovering = ref(false),
  timeAgo = `${formatDistance(Date.now(), props.item.created_at, { includeSeconds: true })} ago`

const deleteItem = (id: number) => {
  itemsStore.deleteItem(id)
}

const setIsHovering = (val: boolean) => {
  isHovering.value = val
}
</script>

<template>
  <div
    class="flex"
    :class="$style['item-container']"
    @mouseover="setIsHovering(true)"
    @mouseleave="setIsHovering(false)"
  >
    <div v-if="isExactMatch">
      <CheckIcon class="green-500"></CheckIcon>
    </div>
    <div class="mr-auto" :class="$style['item-info']">
      <div>{{ item.value }}</div>
      <span v-if="isExactMatch" class="green-500">Exact match</span>
      <span class="text-secondary">{{ `${isExactMatch ? ', ' : ''}#${item.id}` }}</span>
    </div>
    <div>{{ timeAgo }}</div>
    <button
      v-if="isHovering"
      class="button button-circular button-red-500"
      :class="$style['item-delete']"
      @click="deleteItem(item.id)"
    >
      <TrashIcon></TrashIcon>
    </button>
  </div>
</template>

<style lang="scss" module>
@use '@/sass/color.scss';

.item {
  &-container {
    position: relative;
    align-items: center;
    padding: 0 1.429rem;
    gap: 1rem;
  }

  &-info {
    align-items: center;
    padding: 1.125rem 0;
    gap: 0.75rem;

    & span {
      font-size: 0.857rem;
    }
  }
}
</style>

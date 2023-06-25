<template>
  <ul class="inline-flex items-stretch -space-x-px">
    <li>
      <a
        @click="onClickPreviousPage"
        :class="[isInFirstPage ? 'cursor-not-allowed' : 'cursor-pointer']"
        class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <span class="sr-only">Previous</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </li>
    <li v-for="page in pages" :key="page.name">
      <a
        class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        :class="[
          isPageActive(page.name)
            ? 'cursor-not-allowed font-bold'
            : 'cursor-pointer',
        ]"
        @click.prevent="onClickPage(page.name)"
        >{{ page.name }}</a
      >
    </li>
    <li>
      <a
        @click.prevent="onClickNextPage"
        class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        :class="[isInLastPage ? 'cursor-not-allowed' : 'cursor-pointer']"
      >
        <span class="sr-only">Next</span>
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewbox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3,
  },

  totalPages: {
    type: Number,
    required: true,
  },

  perPage: {
    type: Number,
    required: true,
  },

  currentPage: {
    type: Number,
    required: true,
  },

  hasMorePages: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['page-changed'])

function onClickPreviousPage() {
  if (isInFirstPage.value) return
  emit('page-changed', props.currentPage - 1)
}

function onClickPage(pageNum) {
  emit('page-changed', pageNum)
}

function onClickNextPage() {
  if (isInLastPage.value) return
  emit('page-changed', props.currentPage + 1)
}

function isPageActive(pageNum) {
  return props.currentPage === pageNum
}

const startPage = computed(() => {
  if (props.currentPage === 1) {
    return 1
  }

  if (props.currentPage === props.totalPages) {
    return props.totalPages - props.maxVisibleButtons + 1
  }

  return props.currentPage - 1
})
const endPage = computed(() => {
  return Math.min(
    startPage.value + props.maxVisibleButtons - 1,
    props.totalPages
  )
})
const pages = computed(() => {
  const range = []
  for (let i = startPage.value; i <= endPage.value; i += 1) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage,
    })
  }

  return range
})
const isInFirstPage = computed(() => props.currentPage === 1)
const isInLastPage = computed(() => props.currentPage === props.totalPages)
</script>

<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  @apply border-t border-b border-l border-blue-100 px-3 py-2 bg-blue-100 no-underline text-blue-500 text-sm;
}
</style>

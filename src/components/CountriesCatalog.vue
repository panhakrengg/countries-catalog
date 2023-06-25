<template>
  <AdvanceTable
    :countries="countriesPerPage"
    :total-countries="countries.length"
    :current-showing="currentPage * perPage"
    :is-loading="isLoading"
    @search-country="onSearchCountry"
    @sort-country-by-name="onSortCountryByName"
  >
    <template #pagination>
      <Pagination
        v-if="countries.length"
        :total-pages="totalPages"
        :total="total"
        :per-page="perPage"
        :current-page="currentPage"
        :has-more-pages="hasMorePages"
        @page-changed="onShowMore"
      />
    </template>
  </AdvanceTable>
</template>

<script setup>
import { ref, onBeforeMount, watch, computed } from 'vue'
import { SortTypes } from '../Constants'
import Pagination from './Pagination.vue'
import CountriesService from '../services/CountriesService'
import AdvanceTable from './AdvanceTable.vue'

const countries = ref([])
const countriesPerPage = ref([])

const isLoading = ref(true)
const totalPages = ref(0)
const total = ref(0)
const perPage = 25
const currentPage = ref(1)

const countriesService = new CountriesService()
onBeforeMount(async () => {
  isLoading.value = true
  countries.value = await countriesService.getAllCountries()
  onSortCountryNameByAsc()
  isLoading.value = false
})

watch(
  countries,
  () => {
    setTotalPages()
    getCountriesPerPage()
  },
  {
    deep: true,
  }
)

const hasMorePages = computed(() => {
  return currentPage.value !== totalPages.value
})

function setTotalPages() {
  if (countries.value.length < perPage) {
    totalPages.value = 1
    return
  }
  totalPages.value = countries.value.length / perPage
}

async function onSearchCountry(name) {
  isLoading.value = true
  currentPage.value = 1
  if (!name.length) {
    countries.value = await countriesService.getAllCountries()
    onSortCountryNameByAsc()
    isLoading.value = false
    return
  }
  countries.value = await countriesService.searchCountry(name)
  isLoading.value = false
}

function onShowMore(pageNum) {
  currentPage.value = pageNum
  getCountriesPerPage()
}

function getCountriesPerPage() {
  countriesPerPage.value = countries.value.slice(
    (currentPage.value - 1) * perPage,
    currentPage.value * perPage
  )
}

const countryNameSortType = ref(SortTypes.asc.key)

function onSortCountryNameByAsc() {
  countries.value.sort((a, b) => {
    const ca = a.name.official
    const cb = b.name.official
    if (ca < cb) {
      return -1
    }
    if (ca > cb) {
      return 1
    }
    return 0
  })
}
function onSortCountryNameByDesc() {
  countries.value.sort((a, b) => {
    const ca = a.name.official
    const cb = b.name.official
    if (ca < cb) {
      return 1
    }
    if (ca > cb) {
      return -1
    }
    return 0
  })
}

function onSortCountryByName() {
  if (countryNameSortType.value == SortTypes.asc.key) {
    countryNameSortType.value = SortTypes.desc.key
    onSortCountryNameByAsc()
  } else {
    countryNameSortType.value = SortTypes.asc.key
    onSortCountryNameByDesc()
  }
}
</script>

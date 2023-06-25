<template>
  <div>
    <PopupModal
      :country="selectedCountry"
      @on-toggle="onCloseCountryDetails()"
    />

    <section class="dark:bg-gray-900 p-3 sm:p-5">
      <div class="mx-auto max-w-screen-xl">
        <div
          class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden"
        >
          <div
            class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"
          >
            <div class="w-full md:w-1/2">
              <div class="flex items-center">
                <label for="country-search" class="sr-only">Search</label>
                <div class="relative w-full">
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="country-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search country..."
                    v-model="countryName"
                    @keyup.enter="$emit('search-country', countryName)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table
              class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-6 py-3">Flags</th>
                  <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                      Country Name
                      <a
                        class="cursor-pointer"
                        @click.prevent="$emit('sort-country-by-name')"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-3 h-3 ml-1"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 320 512"
                        >
                          <path
                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"
                          />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    2 character Country Code
                  </th>
                  <th scope="col" class="px-6 py-3">
                    3 character Country Code
                  </th>
                  <th scope="col" class="px-6 py-3">Native Country Name</th>
                  <th scope="col" class="px-6 py-3">
                    Alternative Country Name
                  </th>
                  <th scope="col" class="px-6 py-3">Country Calling Codes</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="!props.isLoading">
                  <tr
                    v-for="country in countries"
                    :key="country.area"
                    class="border-b dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      class="w-48 px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        class="img-flag"
                        :src="country.flags.png"
                        :alt="country.flags.alt"
                      />
                    </td>
                    <td class="px-4 py-3">
                      <a
                        class="cursor-pointer hover:text-blue-500 hover:underline"
                        @click="onOpenCountryDetails(country)"
                      >
                        {{ country.name.official }}
                      </a>
                    </td>
                    <td class="px-4 py-3">{{ country.cca2 }}</td>
                    <td class="px-4 py-3">{{ country.cca3 }}</td>
                    <td class="px-4 py-3">
                      <p
                        v-for="(nativeName, key, index) in country.name
                          .nativeName"
                        :key="index"
                      >
                        <span class="font-semibold text-black">{{ key }}</span
                        >: {{ nativeName.official }}
                      </p>
                    </td>
                    <td class="px-4 py-3">
                      {{ country.altSpellings.join(', ') }}
                    </td>
                    <td class="px-4 py-3">
                      <span
                        v-for="(suffix, index) in country.idd.suffixes"
                        :key="suffix"
                      >
                        {{ country.idd.root + suffix }}
                        <span v-if="index != country.idd.suffixes.length - 1"
                          >,&nbsp;</span
                        >
                      </span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <LoadingIcon :is-loading="props.isLoading" />
          </div>

          <!-- Pagination -->
          <nav
            v-if="!props.isLoading"
            class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span class="font-semibold text-gray-900 dark:text-white">{{
                countries.length
              }}</span>
              of
              <span class="font-semibold text-gray-900 dark:text-white">{{
                props.totalCountries
              }}</span>
            </span>

            <slot name="pagination"></slot>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { Modal } from 'flowbite'
import { ref, onMounted } from 'vue'
import PopupModal from './PopupModal.vue'

const props = defineProps({
  countries: {
    type: Array,
  },
  totalCountries: {
    type: Number,
  },
  currentShowing: {
    type: Number,
  },
  isLoading: {
    type: Boolean,
  },
})

let countryName = ref('')

let modal = ref(null)

onMounted(() => {
  const $targetEl = document.querySelector('#defaultModal')
  const options = {
    placement: 'center',
    backdrop: 'dynamic',
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
    closable: true,
  }
  modal = new Modal($targetEl, options)
})

const selectedCountry = ref(null)

function onOpenCountryDetails(country) {
  selectedCountry.value = country
  onToggleModel()
}

function onCloseCountryDetails() {
  selectedCountry.value = null
  onToggleModel()
}

function onToggleModel() {
  modal.toggle()
}
</script>

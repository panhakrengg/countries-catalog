<template>
  <div
    id="defaultModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <template v-if="props.country">
          <div
            class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
          >
            <img
              class="w-28 img-flag"
              :src="props.country.flags.png"
              :alt="props.country.flags.alt"
            />
            <h3
              class="pl-6 text-xl font-semibold text-gray-900 dark:text-white"
            >
              {{ props.country.name.official }}
            </h3>

            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="$emit('on-toggle')"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="p-6 space-y-6">
            <div>
              <label class="font-bold text-black"
                >2 character Country Code:</label
              >
              {{ country.cca2 }}
            </div>
            <div>
              <label class="font-bold text-black"
                >3 character Country Code:
              </label>
              {{ country.cca3 }}
            </div>
            <div class="flex">
              <label class="font-bold text-black">Native Country Name: </label>
              <div>
                <p
                  v-for="(nativeName, key, index) in country.name.nativeName"
                  :key="index"
                >
                  &nbsp;&nbsp; <b>{{ key }}</b> : {{ nativeName.official }}
                </p>
              </div>
            </div>
            <div>
              <label class="font-bold text-black"
                >Alternative Country Name:
              </label>
              {{ country.altSpellings.join(', ') }}
            </div>
            <div>
              <label class="font-bold text-black"
                >Country Calling Codes:
              </label>
              <span
                v-for="(suffix, index) in country.idd.suffixes"
                :key="suffix"
              >
                {{ country.idd.root + suffix }}
                <span v-if="index != country.idd.suffixes.length - 1"
                  >,&nbsp;</span
                >
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  country: {
    type: Object,
    require: true,
  },
})
</script>

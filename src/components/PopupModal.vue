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
          <!-- Modal Header -->
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
          <!-- Modal Body -->
          <div class="p-6 space-y-6">
            <CountryDetailProperties
              name="2 character Country Code"
              :value="country.cca2"
            />
            <CountryDetailProperties
              name="3 character Country Code"
              :value="country.cca3"
            />

            <CountryDetailProperties
              name="Canadian International Organ Competition"
              :value="country.cioc"
            />

            <CountryDetailProperties
              name="Cellular Communication Network Factor 3"
              :value="country.ccn3"
            />

            <CountryDetailProperties name="Status" :value="country.status" />

            <CountryDetailProperties name="Native Country Name">
              <div>
                <p
                  v-for="(nativeName, key, index) in country.name.nativeName"
                  :key="index"
                >
                  &nbsp;&nbsp; <b>{{ key }}</b> : {{ nativeName.official }}
                </p>
              </div>
            </CountryDetailProperties>

            <CountryDetailProperties
              name="Alternative Country Name"
              :value="country.altSpellings.join(', ')"
            />

            <CountryDetailProperties name="Country Calling Codes">
              <span
                v-for="(suffix, index) in country.idd.suffixes"
                :key="suffix"
              >
                {{ country.idd.root + suffix }}
                <span v-if="index != country.idd.suffixes.length - 1"
                  >,&nbsp;</span
                >
              </span>
            </CountryDetailProperties>

            <CountryDetailProperties
              name="Independent"
              :value="country.independent"
            />

            <CountryDetailProperties name="Currencies">
              <span v-for="(cur, index) in country.currencies" :key="index">
                {{ cur.name }}({{ cur.symbol }})
              </span>
            </CountryDetailProperties>

            <CountryDetailProperties
              name="Capital"
              :value="country.capital[0]"
            />

            <CountryDetailProperties name="Region" :value="country.region" />

            <CountryDetailProperties
              name="Subregion"
              :value="country.subregion"
            />

            <CountryDetailProperties name="Languages">
              <span
                v-for="(language, key, index) in country.languages"
                :key="index"
              >
                {{ language }}({{ key }})&nbsp;
              </span>
            </CountryDetailProperties>

            <CountryDetailProperties name="Translations">
              <span
                v-for="(translation, index) in Object.values(
                  country.translations
                )"
                :key="index"
              >
                {{ translation.official }}
                <span v-if="index != Object.values(country.translations).length"
                  >,&nbsp;</span
                >
              </span>
            </CountryDetailProperties>

            <CountryDetailProperties
              name="Landlocked"
              :value="country.landlocked"
            />

            <CountryDetailProperties
              name="Population"
              :value="country.population"
            />

            <CountryDetailProperties
              name="Timezones"
              :value="country.timezones[0]"
            />

            <CountryDetailProperties
              name="Latlng"
              :value="country.latlng.join(', ')"
            />

            <CountryDetailProperties name="Borders">
              <span v-for="(border, index) in country.borders" :key="index">
                {{ border }}
                <span v-if="index != country.borders.length">,&nbsp;</span>
              </span>
            </CountryDetailProperties>

            <CountryDetailProperties name="Area" :value="country.area" />

            <CountryDetailProperties name="Fifa" :value="country.fifa" />

            <CountryDetailProperties
              name="Continents"
              :value="country.continents[0]"
            />

            <CountryDetailProperties
              name="StartOfWeek"
              :value="country.startOfWeek"
            />

            <CountryDetailProperties name="Maps">
              <p v-for="(value, key) in country.maps" :key="key">
                <span class="font-medium">
                  {{ key }}
                </span>
                :
                <a :href="country.maps[key]">
                  {{ country.maps[key] }}
                </a>
              </p>
            </CountryDetailProperties>

            <CountryDetailProperties name="Demonyms">
              <span
                v-for="(demonym, index) in Object.values(country.demonyms)"
                :key="index"
              >
                {{ demonym.f }}
                <span v-if="index != Object.values(country.demonyms).length - 1"
                  >,&nbsp;</span
                >
              </span>
            </CountryDetailProperties>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import CountryDetailProperties from './CountryDetailProperties.vue'

const props = defineProps({
  country: {
    type: Object,
    require: true,
  },
})
</script>

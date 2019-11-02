<template>
  <div class="dropdown">
    <button
      class="btn btn-secondary dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >Filter By Region</button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <div class="dropdown-item" v-for="(items,index) in region" :key="index">
        <div class="form-group form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  name="exampleRadios"
                  :id="['exampleRadios'+index]"
                  @input="filterByRegion(items)"
                  @click="filter()"
                  :disabled="loading"
                />
                <label class="form-check-label" :for="['exampleRadios'+index]">{{items}}</label>
              </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data: () => {
    return {
      region: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
      loading: false,
      filteredCountries: []
    }
  },
  methods: {
    filterByRegion (items) {
      this.loading = true
      let region = items.toLowerCase()
      // console.log('event', event)
      axios
        .get(`https://restcountries.eu/rest/v2/region/${region}`)
        .then(response => {
          this.filteredCountries = response.data
          // this.$emit('filter', 'filteredCountries')
          // this.allCountries = region
          this.loading = false
          // console.log(response.data)
        })
        .catch(error => {
          // handle error
          console.log(error)
          this.loading = false
        })
        .finally(() => {
          // always executed
        })
    },
    filter (event) {
      this.$emit('filter', 'filteredCountries')
    }
  }
}
</script>

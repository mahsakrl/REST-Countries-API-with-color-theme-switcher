<template>
  <div>
    <div class="spin" v-if="loading">
      <div class="spinner-border" role="status"></div>
    </div>

    <div class="app" v-if="!loading">
      <div :class="{header:true,'active-header':darkMode}">
        <div style="padding-left:60px">where in the world</div>
        <div @click="darkSatus()" style="cursor:pointer;padding-right:60px">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="!darkMode">
            <path
              fill="#000000"
              d="M12 2A9.91 9.91 0 0 0 9 2.46A10 10 0 0 1 9 21.54A10 10 0 1 0 12 2Z"
            />
          </svg>
          <i style="padding:5px" class="material-icons" v-if="darkMode">wb_sunny</i>
          <span class="glyphicon" v-if="darkMode"></span>
          <div v-if="!darkMode">Dark Mode</div>
          <div v-if="darkMode">Day Mode</div>
        </div>
      </div>
      <div :class="{main:true,'active-main':darkMode}">
        <div class="search-bar">
          <input
            style="margin-left: 50px;"
            v-model="searchInput"
            @input="searchResult(searchInput)"
            type="email"
            :class="{'form-control':true,'active-searchbar':darkMode,'search-input':true}"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Search For Country"
          />
          <div class="dropdown">
            <button
              :class="{btn:true,'dropdown-toggle':true,'drop-btn':true,active:darkMode}"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Filter By Region</button>
            <div
              :class="{'dropdown-menu':true,'drop-btn':true,active:darkMode}"
              aria-labelledby="dropdownMenuButton"
            >
              <div class="dropdown-item" v-for="(items,index) in region" :key="index">
                <div class="form-group form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="exampleRadios"
                    :id="['exampleRadios'+index]"
                    :value="items"
                    @input="filterByRegion(items)"
                    :disabled="loading"
                  />
                  <label class="form-check-label" :for="['exampleRadios'+index]">{{items}}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-card">
          <card
            v-for="(item,index) in allCountries"
            :key="index"
            :index="index"
            :item="item"
            :active="darkMode"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import card from '../components/card'
// import dropdown from '../components/dropdown'
// import search from '../components/search'
export default {
  name: 'home',
  data: () => {
    return {
      allCountries: [],
      region: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
      loading: false,
      darkMode: false,
      searchInput: '',
      base: 'https://restcountries.eu/rest/v2/',
      resetFilter: false
    }
  },
  methods: {
    darkSatus () {
      this.$store.dispatch('darkMode', {
        payload: !this.darkMode
      })
      this.darkMode = this.$store.state.darkMode
      return this.darkMode
    },
    httpReq (parametr) {
      axios
        .get(this.base + parametr)
        .then(response => {
          this.allCountries = [...response.data]
          this.loading = false
        })
        .catch(error => {
          alert(error)
          this.loading = false
        })
    },
    filterByRegion (items) {
      this.loading = true
      let region = items.toLowerCase()
      let rest = 'region/'
      let parametr = rest.concat(region)
      this.httpReq(parametr)
    },
    fetchPartial (name) {
      let rest = 'name/'
      let parametr = rest.concat(name)
      this.httpReq(parametr)
    },
    fetchFullName (name) {
      let rest = 'name/'
      let parametr = rest.concat(name)
      parametr = parametr.concat('?fullText=true')
      this.httpReq(parametr)
    },
    fetchCapital (name) {
      let rest = 'capital/'
      let parametr = rest.concat(name)
      this.httpReq(parametr)
    },
    searchResult (name) {
      this.loading = true
      if (name === '') {
        this.fetchAllCountries()
      } else {
        this.fetchPartial(name)
        this.fetchFullName(name)
        this.fetchCapital(name)
      }
    },
    fetchAllCountries () {
      this.loading = true
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          this.allCountries = response.data
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
    }
  },
  components: {
    card
    // dropdown,
    // search
  },
  created () {
    console.log('hell')
    this.darkMode = this.$store.state.darkMode
    this.fetchAllCountries()
    this.httpReq('all')
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/app';
@import '../styles/varibles';
</style>

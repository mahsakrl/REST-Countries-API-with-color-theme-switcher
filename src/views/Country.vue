<template>
  <div class="app">
    <div class="spinner-border" role="status" v-if="loading"></div>
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
    <div :class="{'each-country-wrapper':true,'active-container':darkMode}">
      <router-link tag="div" class="btn-back" to="/">
        <button type="button" :class="{btn:true, 'btn-info':true, 'active':darkMode}">
          <i class="material-icons">keyboard_backspace</i>back
        </button>
      </router-link>
      <div :class="{'container-country':true,'active-container':darkMode}">
        <div class="flag">
          <div class="flag-img">
            <img :src="item.flag" />
          </div>
        </div>
        <div class="info">
          <div class="info-name">{{item.name}}</div>
          <div class="info-detail">
            <div>
              <div class="title-text-alignment">
                <p :class="{'title-info':true,'active-title':darkMode}">Native Name:</p>
                <p style="font-size:14px">{{item.nativeName}}</p>
              </div>
              <div class="title-text-alignment">
                <p :class="{'title-info':true,'active-title':darkMode}">Population:</p>
                <p style="font-size:14px">{{item.population}}</p>
              </div>
              <div class="title-text-alignment">
                <p :class="{'title-info':true,'active-title':darkMode}">Region:</p>
                <p style="font-size:14px">{{item.region}}</p>
              </div>
              <div class="title-text-alignment">
                <p :class="{'title-info':true,'active-title':darkMode}">Sub Region:</p>
                <p style="font-size:14px">{{item.population}}</p>
              </div>
              <div class="title-text-alignment">
                <p :class="{'title-info':true,'active-title':darkMode}">Capital:</p>
                <p style="font-size:14px">{{item.capital}}</p>
              </div>
            </div>
            <div>
              <div class="title-text-alignment">
                <p :class="{'title-info':true,'active-title':darkMode}">Top level Domain:</p>
                <p style="font-size:14px">{{item.capital}}</p>
              </div>
              <div class="title-text-alignment">
                <p :class="{'title-info':true,'active-title':darkMode}">Currencies:</p>
                <p
                  style="font-size:14px"
                  v-for="(item,index) in item.currencies"
                  :key="index"
                >{{item.name}},</p>
              </div>
              <div class="title-text-alignment">
                <p :class="{'title-info':true,'active-title':darkMode}">Language:</p>
                <p
                  style="font-size:14px"
                  v-for="(i,index) in item.languages"
                  :key="index"
                >{{i.name}},</p>
              </div>
            </div>
          </div>
          <div>
            <div class="border">
              <p :class="{'title-info':true,'active-title':darkMode}">Border Countries:</p>
              <p class="item-border" v-for="(i,index) in item.borders" :key="index">
                <button :class="{btn:true, 'btn-info':true, 'active':darkMode}" style="border:none">{{i}}</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'country',
  data: () => {
    return {
      loading: false,
      darkMode: false,
      item: {}
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
    storeParams () {
      if (this.$route.params.item) {
        this.$store.dispatch('params', { payload: this.$route.params.item })
        this.item = this.$route.params.item
      } else {
        this.item = { ...this.$store.state.routingParams }
      }
    }
  },
  created () {
    this.darkMode = this.$store.state.darkMode
    this.storeParams()
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/app';
@import '../styles/varibles';
@import '../styles/country';
</style>

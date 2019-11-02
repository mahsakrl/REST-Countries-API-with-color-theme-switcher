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
          <div style="color:$vdark-blue-txt;font-weight:800;font-size:20px">{{item.name}}</div>
          <div class="info-detail">
            <div>
              <div class="d-flex flex-row">
                <p :class="{'title-info':true,'active-title':darkMode}">Native Name:</p>
                <p style="font-size:14px">{{item.nativeName}}</p>
              </div>
              <div class="d-flex flex-row">
                <p :class="{'title-info':true,'active-title':darkMode}">Population:</p>
                <p style="font-size:14px">{{item.population}}</p>
              </div>
              <div class="d-flex flex-row">
                <p :class="{'title-info':true,'active-title':darkMode}">Region:</p>
                <p style="font-size:14px">{{item.region}}</p>
              </div>
              <div class="d-flex flex-row">
                <p :class="{'title-info':true,'active-title':darkMode}">Sub Region:</p>
                <p style="font-size:14px">{{item.population}}</p>
              </div>
              <div class="d-flex flex-row">
                <p :class="{'title-info':true,'active-title':darkMode}">Capital:</p>
                <p style="font-size:14px">{{item.capital}}</p>
              </div>
            </div>
            <div>
              <div class="d-flex flex-row">
                <p :class="{'title-info':true,'active-title':darkMode}">Top level Domain:</p>
                <p style="font-size:14px">{{item.capital}}</p>
              </div>
              <div class="d-flex flex-row">
                <p :class="{'title-info':true,'active-title':darkMode}">Currencies:</p>
                <p
                  style="font-size:14px"
                  v-for="(item,index) in item.currencies"
                  :key="index"
                >{{item.name}},</p>
              </div>
              <div class="d-flex flex-row">
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
            <div style="height:50px;display:flex;align-items:center;justify-content:flex-start">
              <p :class="{'title-info':true,'active-title':darkMode}">Border Countries:</p>
              <p style="width:90px;height:30px" v-for="(i,index) in item.borders" :key="index">
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
.each-country-wrapper {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
}
.active-container {
  background-color: $vdark-blue-bg;
}
.btn-back {
  height: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  button {
    margin-left: 60px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: $white;
    color: $vdark-blue-txt;
    border: none;
    box-shadow: 1px 1px 1px 1px $dgrey;
  }
  button {
    .active {
      background-color: $vdark-blue-bg !important;
    }
  }
}
.container-country {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: $white;
}
.active-container {
  background-color: $vdark-blue-bg;
  color: $white;
}
.active {
  background-color: $dark-blue !important;
}
.flag {
  height: 100%;
  width: 40%;
  display: flex;
  align-items: flex-start;
  padding-left: 60px;
}
.flag-img {
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
  }
}
.info {
  height: 100%;
  width: 60%;
  display: flex;
  flex-flow: column;
  align-items: center;
  div {
    height: 100px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
.info-detail {
  display: flex;
  flex-flow: row;
  height: 70% !important;
  div {
    display: flex;
    flex-flow: column;
  }
}
.title-info {
  color: $vdark-blue-txt;
  font-weight: 600 !important;
  font-size: 14px;
  padding-right: 5px;
}
.active-title {
  color: $white;
}
</style>

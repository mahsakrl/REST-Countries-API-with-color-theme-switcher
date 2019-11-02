<template>
  <router-link
    :to="{ name: 'country', params: { countryId: index,item: item }}"
    tag="div"
    :class="{card:true,active:active}"
  >
    <img :alt="item.name" :src="item.flag" />
    <div class="title">{{item.name}}</div>
    <div class="sub-title">
      <div>
        <p style="color:$white">Population:</p>
        <p style="color:$dgrey">{{item.population}}</p>
      </div>
      <div>
        <p style="color:$white">Region:</p>
        <p style="color:$dgrey">{{item.region}}</p>
      </div>
      <div>
        <p style="color:$white">Capital:</p>
        <p style="color:$dgrey">{{item.capital}}</p>
      </div>
    </div>
  </router-link>
</template>
<style scoped lang="scss">
@import '../styles/varibles';
.card {
  width: 250px;
  height: 350px;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 40px;
  img {
    width: 100%;
  }
}
.title {
  padding-top: 10px;
  padding-left: 20px;
}
.sub-title {
  div {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
}
</style>
<script>
export default {
  props: {
    item: Object,
    index: Number,
    active: Boolean
  }
}
</script>

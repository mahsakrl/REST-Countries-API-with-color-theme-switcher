<template>
  <input
    type="email"
    :class="{'form-control':true, 'col-3':true,active:active}"
    id="exampleInputEmail1"
    aria-describedby="emailHelp"
    placeholder="Search For Country"
  />
</template>
<script>
export default {
  props: {
    active: Boolean
  }
}
</script>

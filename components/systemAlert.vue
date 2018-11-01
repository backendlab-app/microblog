<template>
    <v-alert v-model="alert" :type="type" dismissible>{{ message }}</v-alert>
</template>

<script>
export default {
  computed: {
    alert: {
      get () {
        return this.$store.state.alert
      },
      set (val) {
        this.$store.commit('setAlert', val)
      }
    },
    type () {
      if (this.alert) {
        return this.alert.type
      }
    },
    message () {
      if (this.alert) {
        return this.alert.message
      }
    }
  }
}
</script>

<style>

</style>

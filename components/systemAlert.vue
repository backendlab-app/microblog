<template>
    <v-snackbar v-model="alert" :color="type" vertical top :timeout="6000" v-if="alert">
      {{ message }}
      <v-btn
        flat
        @click="alert = null"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
  computed: {
    alert: {
      get () {
        return this.$store.state.alert
      },
      set (val) {
        this.$store.commit('showAlert', val)
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

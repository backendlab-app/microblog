<template>
  <v-app>
    <system-alert></system-alert>
    <v-content v-if="user">
      <main-app></main-app>
    </v-content>
    <v-content v-else>
      <login-screen></login-screen>
    </v-content>
  </v-app>
</template>

<script>
import loginScreen from '~/components/loginScreen'
import mainApp from '~/components/mainApp'
import systemAlert from '~/components/systemAlert'

export default {
  components: { loginScreen, mainApp, systemAlert },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style>

</style>

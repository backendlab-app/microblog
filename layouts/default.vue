<template>
  <v-app>
    <system-alert></system-alert>
    <v-content v-if="user">
      <nuxt/>
    </v-content>
    <v-content v-else>
      <login-page></login-page>
    </v-content>
  </v-app>
</template>

<script>
import loginPage from '~/components/loginPage'
import mainApp from '~/components/mainApp'
import systemAlert from '~/components/systemAlert'

export default {
  components: { loginPage, mainApp, systemAlert },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style>

</style>

<template>
  <v-app>
    <v-toolbar dark height="95px" color="cyan" app>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <div>
          <div class="display-1 text-xs-center">Microblog</div>
          <div class="title text-xs-center">Built with BackendLab and VueJS</div>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
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

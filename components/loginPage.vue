<template>
 <v-container fluid fill-height>
   <v-snackbar color="info" top :value="true">
     Create an account, or simply login with username "test" and password "pass"
   </v-snackbar>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card flat class="">
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person" 
                name="login" 
                hide-details
                label="Username" 
                type="text" 
                outline
                class="mb-3"
                v-model="username"
              ></v-text-field>
              <v-text-field
                id="password" 
                browser-autocomplete="new-password"
                prepend-icon="lock" 
                name="password" 
                hide-details
                label="Password"
                outline
                type="password" 
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn :loading="loading" flat text color="primary" @click="createAccount">Create account</v-btn>
            <v-spacer></v-spacer>
            <v-btn :loading="loading" flat text color="success" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    login () {
      this.$store.dispatch('login', { username: this.username, password: this.password })
    },
    createAccount () {
      var post = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('createUser', post)
    }
  },
  computed: {
    loading () {
      return this.$store.state.loggingIn
    }
  },
  data: () => ({
    username: null,
    password: null
  })
}
</script>

<style>

</style>

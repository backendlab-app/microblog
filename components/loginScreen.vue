<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md6>
            <v-card flat class="">
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person" 
                    name="login" 
                    label="Login" 
                    type="text" 
                    v-model="username"
                    hint="You can login with the username 'user'"
                    persistent-hint
                  ></v-text-field>
                  <v-text-field
                    id="password" 
                    prepend-icon="lock" 
                    name="password" 
                    label="Password" 
                    type="password" 
                    v-model="password"
                    hint="You can login with the password 'pass'"
                    persistent-hint  
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :loading="loading" flat text color="primary" @click="login">Login</v-btn>
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
    }
  },
  computed: {
    loading () {
      return this.$store.state.loggingIn
    }
  },
  data: () => ({
    username: 'user',
    password: 'pass'
  })
}
</script>

<style>

</style>

<template>
  <v-card flat class="">
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="person" 
          name="login" 
          hide-details
          label="Login" 
          type="text" 
          outline
          class="mb-3"
          v-model="username"
        ></v-text-field>
        <v-text-field
          id="password" 
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
      <v-spacer></v-spacer>
      <v-btn :loading="loading" flat text color="primary" @click="login">Login</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    async login () {
      await this.$store.dispatch('login', { username: this.username, password: this.password })
      this.$emit('close')
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

<template>
    <v-container>
        {{ posts }}
        <v-list three-line></v-list>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      posts: 'posts/list'
    })
  },
  mounted () {
    var self = this
    this.$nextTick(() => {
      self.$store.dispatch('posts/fetch')
    })
  }
}
</script>

<style>

</style>

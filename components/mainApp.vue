<template>
    <v-container fluid fill-height class="py-0">
      <v-dialog v-model="showLoginDialog" max-width="800">
        <login-screen @close="showLoginDialog = false"></login-screen>
      </v-dialog>
      <v-layout align-center justify-center>
        <v-flex xs12 md8 lg8>
          <v-timeline dense align-top>
            <v-timeline-item
              v-for="(post, i) in coloredPosts"
              fill-dot
              :color="post.color"
              :key="i"
              large
            >
              <span slot="icon">{{ post.author.username[0].toUpperCase() }}</span>
              <div class="">
                <h2 :class="`headline font-weight-light mb-0 ${post.color}--text`">{{ post.author.username }}</h2>
                <p class="grey--text">{{ post['date-created'] | humanTime }}</p>
                <div class="pa-0 blockquote grey--text text--darken-4">
                  {{ post.content }}
                </div>
              </div>
              <v-timeline dense fill-dot>
                <v-timeline-item
                  :key="comment.id"
                  color="grey"
                  class="mb-3"
                  small
                  v-for="comment in getComments(post)"
                >
                  <v-layout justify-space-between>
                    <v-flex xs7 class="font-weight-thin body-2 mt-3">
                      {{ comment.content }}
                    </v-flex>
                    <v-flex xs5 text-xs-right class="">
                      <div>
                        <p class="my-0">{{ comment['date-created'] | humanTime }}</p>
                        <p class="my-0">{{ comment.author.username }}</p>
                      </div>
                      
                    </v-flex>
                  </v-layout>

                  
                </v-timeline-item>
                <v-timeline-item
                  class="white--text mb-5"
                  :color="post.color"
                  medium
                >
                  <span slot="icon" v-if="user">{{ user.username[0].toUpperCase() }}</span>
                  <span slot="icon" v-else></span>
                  <v-text-field
                    v-model="newComments[post.id]"
                    hide-details
                    flat
                    :label="user ? 'Leave a comment...' : 'Login to leave a comment...'"
                    solo
                    :disabled="!user"
                    @keydown.enter="addComment(post)"
                  >
                    <template slot="append">
                      <v-btn
                        class="mx-0"
                        dark
                        :color="post.color"
                        depressed
                        :disabled="!user"
                        @click="addComment(post)"
                      >
                        Post
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-timeline-item>
              </v-timeline>
              
            </v-timeline-item>
          </v-timeline>
          <v-tooltip left v-if="!user">
            <v-btn fab fixed bottom right icon dark color="primary" slot="activator" disabled>
              <v-icon>add</v-icon>
            </v-btn>
            <span>Login to create a new post</span>
          </v-tooltip>
          <v-dialog v-else v-model="newPostDialog" max-width="800">
            <v-btn fab fixed bottom right icon dark color="primary" slot="activator">
              <v-icon>add</v-icon>
            </v-btn>
            <v-card flat>
              <v-text-field
                solo
                label="New post"
                v-model="content"
                hide-details
                :disabled="!user"
                @keydown.enter="createPost"
              ></v-text-field>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-speed-dial
        v-model="fab"
        fixed
        top
        right
        direction="bottom"
        transition="slide-y-reverse"
      >
        <v-btn
          slot="activator"
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon>account_circle</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-tooltip left v-if="!user">
          <v-btn
            slot="activator"
            fab
            dark
            small
            color="green"
            @click="showLoginDialog = true"
          >
            <v-icon>vpn_key</v-icon>
          </v-btn>
          <span>Login</span>
        </v-tooltip>
        <v-tooltip left v-if="!user">
          <v-btn
            slot="activator"
            fab
            dark
            small
            color="indigo"
          >
            <v-icon>add</v-icon>
          </v-btn>
          <span>Create account</span>
        </v-tooltip>

        <v-tooltip left v-else>
          <v-btn
            slot="activator"
            fab
            dark
            small
            color="error"
            @click="logout"
          >
            <v-icon>exit_to_app</v-icon>
          </v-btn>
          <span>Logout</span>
        </v-tooltip>
        
      </v-speed-dial>
  </v-container>
    
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import loginScreen from '~/components/loginScreen'

export default {
  components: { loginScreen },
  computed: {
    ...mapGetters({
      posts: 'posts/list',
      comments: 'comments/list'
    }),
    coloredPosts () {
      return this.posts.map(post => Object.assign({ color: this.getRandomColor() }, post)).sort((a, b) => { return new Date(b['date-created']) - new Date(a['date-created']) })
    },
    user () {
      return this.$store.state.user
    }
  },
  filters: {
    humanTime (rawTime) {
      return moment(rawTime).calendar()
    }
  },
  data: () => ({
    colors: ['red', 'purple', 'pink', 'cyan', 'blue', 'green'],
    content: null,
    newPostDialog: false,
    newComments: {},
    fab: null,
    showLoginDialog: false
  }),
  methods: {
    async logout () {
      this.$store.dispatch('logout')
    },
    getComments (post) {
      return this.comments.filter(c => c.post.id === post.id)
    },
    async addComment (post) {
      var data = {
        content: this.newComments[post.id],
        author: this.user.id,
        post: post.id
      }
      await this.$store.dispatch('comments/create', data)
      this.newComments = {}
    },
    getRandomColor () {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    async createPost () {
      var data = {
        content: this.content,
        author: this.user.id
      }
      await this.$store.dispatch('posts/create', data)
      this.newPostDialog = null
      this.content = null
    }
  },
  mounted () {
    var self = this
    this.$nextTick(async function () {
      self.$nuxt.$loading.start()
      await self.$store.dispatch('posts/fetch')
      await self.$store.dispatch('comments/fetch')
      self.$nuxt.$loading.finish()
    })
  }
}
</script>

<style>

</style>

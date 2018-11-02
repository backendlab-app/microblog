const axios = require('axios')
const btoa = require('btoa')
const Cookies = require('js-cookie')
const cookie = require('cookie')

const apiRoot = process.env.API_ROOT
const customerId = process.env.CUSTOMER_ID
const groupId = process.env.GROUP_ID

export const state = () => ({
  user: null,
  alert: null,
  loggingIn: false
})

export const mutations = {
  setLoggingIn (state, status) {
    state.loggingIn = status
  },
  setUser (state, user) {
    state.user = user
  },
  showAlert (state, alert) {
    state.alert = alert
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch, commit }, { req }) {
    try {
      let { username, password } = cookie.parse(req.headers.cookie)

      if (username && password) {
        var headers = {
          Authorization: 'Basic ' + btoa(`${username}:${password}`)
        }
        try {
          var { data } = await axios.get(`${apiRoot}/${customerId}/profile/`, { headers })
          commit('setUser', data)
        } catch (err) {
          console.error(err)
          commit('logout')
        }
      }
    } catch (err) {
      console.error(err)
    }
  },
  async createUser ({ commit, dispatch }, { username, password }) {
    try {
      var headers = {
        Authorization: process.env.AUTH_STRING
      }
      var { data } = await axios.post(`${apiRoot}users/`, { username, password, customer: process.env.CUSTOMER_ID }, { headers })
      var groupResponse = await axios.get(`${apiRoot}groups/${groupId}/`, { headers })
      var group = groupResponse.data
      console.log(group)
      group.users = [ ...group.users, data.id ]
      console.log(group.users)
      await axios.put(`${apiRoot}groups/${group.id}/`, group, { headers })
      Cookies.set('username', username)
      Cookies.set('password', password)
      commit('setUser', data)
    } catch (err) {
      if (err.response) {
        commit('showAlert', { type: 'error', message: err.response.data })
      } else {
        commit('showAlert', { type: 'error', message: 'An unknown error occurred' })
      }
      console.error(err.stack)
    }
  },
  async logout ({ commit }) {
    Cookies.set('username', null)
    Cookies.set('password', null)
    commit('setUser', null)
  },
  async login ({ commit }, { username, password }) {
    commit('setLoggingIn', true)
    try {
      var headers = {
        Authorization: 'Basic ' + btoa(`${username}:${password}`)
      }
      console.log(username, password)
      var { data } = await axios.get(`${apiRoot}${customerId}/profile/`, { headers })
      Cookies.set('username', username)
      Cookies.set('password', password)
      commit('setUser', data)
    } catch (err) {
      if (err.response) {
        commit('showAlert', { type: 'error', message: err.response.data })
      } else {
        commit('showAlert', { type: 'error', message: 'An unknown error occurred' })
      }
      console.error(err.stack)
    }
    commit('setLoggingIn', false)
  }
}

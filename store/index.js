const axios = require('axios')
const btoa = require('btoa')
const Cookies = require('js-cookie')

const apiRoot = process.env.API_ROOT
const customerId = process.env.CUSTOMER_ID

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
  showAlert (state, { type, message }) {
    state.alert = { type, message }
  }
}

export const actions = {
  async createUser ({ commit, dispatch }, { username, password }) {
    try {
      var headers = {
        Authorization: process.env.AUTH_STRING
      }
      var { data } = await axios.post(`${apiRoot}/users`, { username, password }, { headers })
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
  async login ({ commit }, { username, password }) {
    commit('setLoggingIn', true)
    try {
      var headers = {
        Authorization: 'Basic ' + btoa(`${username}:${password}`)
      }
      var { data } = await axios.get(`${apiRoot}/${customerId}/profile`, { headers })
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

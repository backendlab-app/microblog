const axios = require('axios')
const Cookies = require('js-cookie')

const apiRoot = process.env.API_ROOT
const customerId = process.env.CUSTOMER_ID

const endpoint = `${apiRoot}/${customerId}/microblog/post`

export const state = () => ({
  objects: {},
  ids: []
})

export const mutations = {
  clear (state) {
    state.objects = {}
    state.ids = []
  },
  set (state, objects) {
    var newObjects = {}
    var newIds = []
    for (var o in objects) {
      var obj = objects[o]
      newObjects[obj.id] = obj
      newIds.push(obj.id)
    }
    state.objects = newObjects
    state.ids = newIds
  }
}

export const actions = {
  async fetch ({ commit, dispatch }) {
    try {
      var username = Cookies.get('username')
      var password = Cookies.get('password')
      var headers = {
        Authorization: 'Basic ' + btoa(`${username}:${password}`)
      }
      var { data } = await axios.get(endpoint, { headers })
      commit('set', data.results)
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          dispatch('logout', {}, { root: true })
        }
        commit('showAlert', { type: 'error', message: err.response.data }, { root: true })
      }
    }
  },
  async create ({ commit, dispatch }, post) {
    try {
      var token = Cookies.get('token')
      var headers = {
        Authorization: 'JWT ' + token
      }
      await axios.post(endpoint, post, { headers })
      dispatch('fetch')
      dispatch('raiseSuccess', 'Object created successfully', { root: true })
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          dispatch('logout', {}, { root: true })
        }
        dispatch('raiseError', err.response.data, { root: true })
      }
    }
  },
  async update ({ commit, dispatch }, { id, changes }) {
    try {
      var token = Cookies.get('token')
      var headers = {
        Authorization: 'JWT ' + token
      }
      await axios.put(endpoint + id + '/', changes, { headers })
      dispatch('raiseSuccess', 'Object updated successfully', { root: true })
      dispatch('fetch')
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          dispatch('logout', {}, { root: true })
        }
        dispatch('raiseError', err.response.data, { root: true })
      }
    }
  },
  async delete ({ commit, dispatch }, id) {
    try {
      var token = Cookies.get('token')
      var headers = {
        Authorization: 'JWT ' + token
      }
      await axios.delete(endpoint + id + '/', { headers })
      dispatch('fetch')
      dispatch('raiseSuccess', 'Object deleted successfully', { root: true })
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          dispatch('logout', {}, { root: true })
        }
        console.error(err)
        dispatch('raiseError', err.response.data, { root: true })
      }
    }
  }
}

export const getters = {
  list: function (state) {
    return state.ids.map(id => state.objects[id])
  },
  getById: (state) => function (id) {
    return state.objects[id]
  }
}

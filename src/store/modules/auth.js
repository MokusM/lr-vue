import authApi from '@/api/auth'

const state = {
  isSubmitting: false,
  currenUser: null,
  validatinErrors: null,
  isLoggedIn: null
}
const mutations = {
  registerStart(state) {
    state.isSubmitting = true
    state.validatinErrors = null
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false
    state.currenUser = payload
    state.isLoggedIn = true
  },
  registerFailer(state, payload) {
    state.isSubmitting = false
    state.validatinErrors = payload
  }
}

const actions = {
  register(context, credentials) {
    return new Promise(resolve => {
      context.commit('registerStart')
      authApi
        .register(credentials)
        .then(response => {
          context.commit('registerSuccess', response.data.user)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit('registerFailer', result.response.data.errors)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}

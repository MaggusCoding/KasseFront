import { createStore } from 'vuex'
import { auth } from './auth.module'

const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  modules: {
    auth
  }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  getters,
  state: {
    courseId: ''
  },
  mutations: {
    SET_COURSE: (state, course) => {
      state.courseId = course
    }
  },
  actions: {
    test({ commit }, courseId) {
      return new Promise((resolve) => {
        commit('SET_COURSE', courseId)
        resolve()
      })
    }
  }
})

export default store

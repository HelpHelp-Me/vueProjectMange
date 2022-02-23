// import { getAllTags } from '@/api/tags'
import axios from 'axios'

const state = {
  tags: []
}

const mutations = {
  SET_TAGS: (state, tags) => {
    state.tags = tags
  }
}

const actions = {
  getAllTags({ commit }) {
    // getAllTags.then(res => {
    //   console.log('get all tags-----', res)
    // })
    axios.get('/api/tags/getAllTags').then(res => {
      console.log('get all tags-----', res)
      if (res.status === 200) {
        commit('SET_TAGS', res.data)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

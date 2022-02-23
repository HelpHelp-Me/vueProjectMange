// import { getAllTags } from '@/api/tags'
import axios from 'axios'

const state = {
  articleList: [],
  currentArticle: {}
}

const mutations = {
  SET_LIST: (state, list) => {
    state.articleList = list
  },
  GET_ONE_ARTICLE: (state, index) => {
    const currentArticle = state.articleList[index]
    state.currentArticle = currentArticle
  }
}

const actions = {
  getAllArticle({ commit }) {
    axios.get('/api/richText/getAllArticle').then(res => {
      if (res.status === 200) {
        commit('SET_LIST', res.data)
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

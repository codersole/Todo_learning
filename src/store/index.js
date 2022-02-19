import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputText: "aaa",
    nextId: 5,
    keyView: 'all'
  },
  getters: {
    getLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    fliterData(state) {
      if(state.keyView === 'all') {
        return state.list
      }
      if(state.keyView === 'undone') {
        return state.list.filter(x => x.done === false)
      }
      if(state.keyView === 'done') {
        return state.list.filter(x => x.done === true)
      }
      return state.list
    }
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    // 重新赋值
    setInputvalue(state, val) {
      state.inputText = val
    },
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputText.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputText = ''
    },
    deItem(state, id) {
      // 找出要删除的索引
      const i = state.list.findIndex(x => x.id === id)

      if(i !== -1) {
        state.list.splice(i, 1)
      }
    },
    changeItem(state, param) {
      // 找出要修改状态的checkbox
      const i = state.list.findIndex( x => x.id === param.id)

      if(i !== -1) {
        state.list[i].done = param.status
      }
    },
    clearList(state) {
      const wdo = state.list.filter(x => x.done === false)
      state.list = wdo
      
    },
    changeBtn(state, key) {
      state.keyView = key
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({data}) => {
        // console.log(data);
        context.commit('initList', data)
      })
    }
  },
  modules: {
  }
})

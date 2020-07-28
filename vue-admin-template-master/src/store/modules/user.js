import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = { 
  // 登录  
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => { 
        commit('SET_TOKEN', response.data.token)
        setToken(response.data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }, 
  // 获取信息
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then( res => { 
        if(!res.data.userinfo) {
          router.push('/login')
        }
        commit('SET_NAME', res.data.userinfo.username)
        commit('SET_AVATAR', res.data.userinfo.avatar)
        resolve(res.data.userInfo)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 退出登录
  logout ({commit}) {
    return new Promise(reslove => {
      removeToken()
      resetRouter() 
      commit('RESET_STATE') 
      reslove()
    })
  },
  removeToken({commit}) {
    return new Promise( reslove => {
      removeToken()
      commit('RESET_STATE')
      reslove()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


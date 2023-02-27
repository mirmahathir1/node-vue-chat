const state = {
  username:''
};
const mutations = {
  'SET_NAME'(state,username){
    state.username = username;
  }
};

const actions = {
  setUsername: ({commit},username)=>{
    commit('SET_NAME',username);
  }
};

const getters = {
  username: state =>{
    return state.username;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}

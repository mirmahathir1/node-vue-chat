const state = {
  roomName:''
};
const mutations = {
  'SET_ROOM'(state,roomName){
    state.roomName = roomName;
  }
};

const actions = {
  setRoom: ({commit},roomName)=>{
    commit('SET_ROOM',roomName);
  }
};

const getters = {
  roomName: state =>{
    return state.roomName;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}

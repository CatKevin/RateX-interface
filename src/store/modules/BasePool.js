import BasePoolABI from "@/contracts/BasePool.json";
import Config from "@/config/config.json";

const state = {
  BasePoolABI: null,
  BasePoolAddress: null,
  BasePoolContract: null
};

const getters = {
  getAbi(state) {
    return state.BasePoolABI;
  },
  getBasePoolAddress(state) {
    return state.BasePoolAddress;
  },
  getBasePoolContract(state) {
    return state.BasePoolContract;
  }
};

const actions = {
  async fetchBasePoolContract({ commit, rootState }) {
    let web3 = rootState.accounts.web3;
    let contractAddress = Config.BasePoolAddress;
    let contract = new web3.eth.Contract(BasePoolABI, contractAddress);
    commit("setBasePoolContract", contract);
  },
  storeBasePoolABI({commit}) {
    commit("setBasePoolABI", BasePoolABI);
  },
  storeBasePoolAddress({ commit }) {
    let BasePoolAddress = Config.BasePoolAddress;
    commit("setBasePoolAddress", BasePoolAddress);
  }
};

const mutations = {
  setBasePoolABI(state, abi) {
    state.BasePoolABI = abi;
  },
  setBasePoolAddress(state, address) {
    state.BasePoolAddress = address;
  },
  setBasePoolContract(state, _contract) {
    state.BasePoolContract = _contract;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

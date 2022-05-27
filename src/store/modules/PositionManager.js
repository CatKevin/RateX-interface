import PositionManagerContractABI from "@/contracts/PositionManagerContract.json";
import Config from "@/config/config.json";

const state = {
  PositionManagerContractABI: null,
  PositionManagerContractAddress: null,
  PositionManagerContractContract: null
};

const getters = {
  getAbi(state) {
    return state.PositionManagerContractABI;
  },
  getPositionManagerContractAddress(state) {
    return state.PositionManagerContractAddress;
  },
  getPositionManagerContractContract(state) {
    return state.PositionManagerContractContract;
  }
};

const actions = {
  async fetchPositionManagerContractContract({ commit, rootState }) {
    let web3 = rootState.accounts.web3;
    let contractAddress = Config.PositionManagerContractAddress;
    let contract = new web3.eth.Contract(PositionManagerContractABI, contractAddress);
    commit("setPositionManagerContractContract", contract);
  },
  storePositionManagerContractABI({commit}) {
    commit("setPositionManagerContractABI", PositionManagerContractABI);
  },
  storePositionManagerContractAddress({ commit }) {
    let PositionManagerContractAddress = Config.PositionManagerContractAddress;
    commit("setPositionManagerContractAddress", PositionManagerContractAddress);
  }
};

const mutations = {
  setPositionManagerContractABI(state, abi) {
    state.PositionManagerContractABI = abi;
  },
  setPositionManagerContractAddress(state, address) {
    state.PositionManagerContractAddress = address;
  },
  setPositionManagerContractContract(state, _contract) {
    state.PositionManagerContractContract = _contract;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

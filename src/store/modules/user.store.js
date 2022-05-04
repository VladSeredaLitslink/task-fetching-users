import httpClient from "@/utils/http";

export default {
  state: {
    users: [],
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await httpClient.get("/Users");
        commit("setUsers", response);

        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
  },
};

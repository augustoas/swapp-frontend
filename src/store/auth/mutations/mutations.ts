import { MutationTree } from "vuex";
import { State } from "../state/state.types";
import { Mutations } from "./mutations.types";

const mutations: MutationTree<State> = {
  [Mutations.SIGNIN](state, payload) {
    state.auth.token = payload.token;
    state.auth.user = payload.user;
    state.authenticated = true;
  },
  [Mutations.SIGNOUT](state) {
    state.auth = {};
  },
  [Mutations.SET_AUTHENTICATED](state, payload) {
    state.authenticated = payload;
  },
  [Mutations.SET_JOB_IN_PROGRESS](state, payload) {
    state.jobInProgress = payload;
  },
  [Mutations.SET_ERROR](state, payload) {
    state.error = payload;
  },
};

export default mutations;

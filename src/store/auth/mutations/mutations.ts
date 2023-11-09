import { MutationTree } from "vuex";
import { State, Errors } from "../state/state.types";
import { Mutations } from "./mutations.types";
import { defaultState } from "../state/state";

const inititalState = defaultState();

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
  [Mutations.SET_ERROR](state, payload) {
    state.error = payload;
  },
};

export default mutations;

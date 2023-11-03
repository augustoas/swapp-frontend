import { MutationTree } from "vuex";
import { State, Errors } from "../state/state.types";
import { Mutations } from "./mutations.types";
import { defaultState } from "../state/state";

const inititalState = defaultState();

const mutations: MutationTree<State> = {
  [Mutations.SIGNIN](state, payload) {
    state.auth = payload;
  },
  [Mutations.SIGNOUT](state) {
    state.auth = {};
  },
  [Mutations.SET_TOKEN](state, token) {
    console.log("SET TOKEN MUTATION", token);
    state.auth.token = token;
  },
  [Mutations.SET_AUTHENTICATED](state, payload) {
    console.log("SET AUTH MUTATION", payload);
    state.authenticated = payload;
  },
  [Mutations.SET_ERROR](state, payload) {
    console.log("SET Error payload", payload);
    state.error = payload;
  },
};

export default mutations;

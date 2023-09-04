import { MutationTree } from "vuex";
import { State, Errors } from "../state/state.types";
import { Mutations } from "./mutations.types";
import { defaultState } from "../state/state";

const inititalState = defaultState();

const mutations: MutationTree<State> = {
  [Mutations.LOGIN](state, payload) {
    state.authenticated = true;
  },
  [Mutations.LOGOUT](state, payload) {
    state.authenticated = false;
  },
};

export default mutations;

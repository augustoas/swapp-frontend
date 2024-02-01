import { MutationTree } from "vuex";
import { State } from "../state/state.types";
import { Mutations } from "./mutations.types";

const mutations: MutationTree<State> = {
  [Mutations.SET_CURRENT_TAB](state, payload) {
    state.currentTab = payload;
  },
};

export default mutations;

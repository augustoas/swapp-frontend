import { ActionTree } from "vuex";
import { InterfaceRootState as RootState } from "@/types/rootState";

import { State } from "@/store/auth/state/state.types";
import { Mutations } from "../mutations/mutations.types";

const actions: ActionTree<State, RootState> = {
  async setCurrentTab({ commit }, payload) {
    const currentTab = payload;

    if (currentTab) {
      commit(Mutations.SET_CURRENT_TAB, currentTab);
    }
  },
};

export default actions;

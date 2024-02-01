import state from "./state/state";
import mutations from "./mutations/mutations";
import actions from "./actions/actions";

export type { State } from "./state/state.types";

export { Mutations } from "./mutations/mutations.types";

export type { ActionsSignatures } from "./actions/actions.types";

const getters = {
  currentTab: (state) => state.currentTab,
  // ... other getters
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

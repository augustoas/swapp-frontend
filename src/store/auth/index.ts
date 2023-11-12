import state from "./state/state";
import mutations from "./mutations/mutations";
import actions from "./actions/actions";

export type { State } from "./state/state.types";

export { Mutations } from "./mutations/mutations.types";

export type { ActionsSignatures } from "./actions/actions.types";

const getters = {
  isAuthenticated: (state) => state.authenticated,
  // ... other getters
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

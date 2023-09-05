import { ActionTree } from "vuex";
import { InterfaceRootState as RootState } from "@/types/rootState";

import { State, Errors } from "@/store/auth/state/state.types";
import { Mutations } from "../mutations/mutations.types";

import { AuthService } from "@/services";

const actions: ActionTree<State, RootState> = {
  async login({ commit }) {
    // try {
    //   commit(Mutations.LOGIN, true);
    //   return await SCBlendingService.downloadBlendRawCoalRelease<ReturnType<ActionsSignatures['downloadRawCoalRelease']>>();
    // } catch (error) {
    //   commit(Mutations.SET_ERROR, { name: Errors.BLENDING_DOWNLOAD_RAW_COAL_RELEASE_ERROR, error });
    //   throw error;
    // }
    console.log("login action");
  },

  async logout({ commit }) {
    // try {
    //   commit(Mutations.LOGIN, false);
    //   return await SCBlendingService.downloadBlendRawCoalRelease<ReturnType<ActionsSignatures['downloadRawCoalRelease']>>();
    // } catch (error) {
    //   commit(Mutations.SET_ERROR, { name: Errors.BLENDING_DOWNLOAD_RAW_COAL_RELEASE_ERROR, error });
    //   throw error;
    // }
    console.log("logout action");
  },
};

export default actions;

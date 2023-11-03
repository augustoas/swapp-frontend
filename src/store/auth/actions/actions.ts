/* eslint-disable prettier/prettier */
import Cookies from 'js-cookie';

import { ActionTree } from "vuex";
import { InterfaceRootState as RootState } from "@/types/rootState";

import { State, Errors } from "@/store/auth/state/state.types";
import { Mutations } from "../mutations/mutations.types";
import { ActionsSignatures } from "./actions.types";

import { AuthService } from "@/services";

const actions: ActionTree<State, RootState> = {
  async signIn({ commit }, payload) {

    try {
      const response = await AuthService.signIn<ReturnType<ActionsSignatures["signIn"]>, State["auth"]>(payload);
      if (!response.data) throw Error("Response from server was empty");

      // Assuming the token is directly inside response.data.payload
      const token = response.data.payload.token;
      
      if (token) {
        // Set the cookie here.
        Cookies.set('auth_token', token, { expires: 1, path: '/', secure: true, sameSite: 'strict' });
        commit(Mutations.SIGNIN, response.data.payload)
        commit(Mutations.SET_AUTHENTICATED, true)
      } else {
        commit(Mutations.SET_ERROR, { error: Errors.SIGNIN_ERROR, message: "Email or password is incorrect" });
        console.log("token not found");
        return "Token not found in the response"; // return error message
      }
    } catch (error) {
      console.log("error catch ", error);
      commit(Mutations.SET_ERROR, { error: Errors.SIGNIN_ERROR, message: "Email or password is incorrect" });
      return "Something went wrong";
    }
  },

  async signUp({ commit }) {
    // try {
    //   commit(Mutations.LOGIN, false);
    //   return await SCBlendingService.downloadBlendRawCoalRelease<ReturnType<ActionsSignatures['downloadRawCoalRelease']>>();
    // } catch (error) {
    //   commit(Mutations.SET_ERROR, { name: Errors.BLENDING_DOWNLOAD_RAW_COAL_RELEASE_ERROR, error });
    //   throw error;
    // }
    console.log("signUp action");
  },

  async signOut({ commit }) {
    commit(Mutations.SIGNIN, {})
    commit(Mutations.SET_AUTHENTICATED, false)
  },

  async authenticate({ commit }, payload) {
    const token = payload;

    if (token) {
      commit(Mutations.SET_AUTHENTICATED, true)
      commit(Mutations.SET_TOKEN, token);
    }
  }
};

export default actions;

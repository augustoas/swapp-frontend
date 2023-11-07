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
      const user = response.data.payload.user;

      console.log('try signin response.data.payload', response.data.payload);
      console.log('auth', user);
      
      if (token) {
        // Set the cookie here.
        Cookies.set('auth_token', token, { expires: 1, path: '/', secure: true, sameSite: 'strict' });
        Cookies.set('auth_email', user.email , { expires: 1, path: '/', secure: true, sameSite: 'strict' });
        commit(Mutations.SIGNIN, response.data.payload)
        commit(Mutations.SET_AUTHENTICATED, true)
      } else {
        commit(Mutations.SET_ERROR, { error: Errors.SIGNIN_ERROR, message: "Email or password is incorrect" });
        return "Token not found in the response"; // return error message
      }
    } catch (error) {
      commit(Mutations.SET_ERROR, { error: Errors.SIGNIN_ERROR, message: "Something went wrong" });
      return "Something went wrong, try again later.";
    }
  },

  async signUp({ commit }, payload) {
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
    const token = payload.token;
    const auth_email = payload.auth_email;

    if (token) {
      commit(Mutations.SET_AUTHENTICATED, true)
      commit(Mutations.SET_TOKEN, token);
      commit(Mutations.SET_AUTH_EMAIL, auth_email);
    }
  }
};

export default actions;

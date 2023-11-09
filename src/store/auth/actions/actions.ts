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
      if (!response.data) {
        commit(Mutations.SET_ERROR, { error: Errors.SIGNIN_ERROR, message: "Response from server was empty" });
        return false;
      }
  
      const { token, user } = response.data.payload;
  
      if (token) {
        Cookies.set('auth_token', token, { expires: 1, path: '/', secure: true, sameSite: 'strict' });
        localStorage.setItem('auth_user', JSON.stringify(user));
        commit(Mutations.SIGNIN, response.data.payload);
        commit(Mutations.SET_AUTHENTICATED, true);
        return true;
      } else {
        commit(Mutations.SET_ERROR, { error: Errors.SIGNIN_ERROR, message: "Token not found in the response" });
        return false;
      }
    } catch (error: any) {
      commit(Mutations.SET_ERROR, { error: Errors.SIGNIN_ERROR, message: error.message || "Something went wrong" });
      return false;
    }
  },

  async signUp({ commit }, payload) {
    try {
      const response = await AuthService.signUp<ReturnType<ActionsSignatures["signUp"]>, State["auth"]>(payload);
      if (!response.data){
        commit(Mutations.SET_ERROR, { error: Errors.SIGNUP_ERROR, message: "Response from server was empty" });
      }
      if (response.status === 201) {
        return true;
      }
    } catch (error: any) {
      commit(Mutations.SET_ERROR, { error: Errors.SIGNUP_ERROR, message: error.message || "Something went wrong" });
      return false;
    }
  },

  async signOut({ commit }) {
    Cookies.remove('auth_token', { path: '/' });
    localStorage.removeItem('auth_user');
    
    commit(Mutations.SIGNIN, {})
    commit(Mutations.SET_AUTHENTICATED, false)
    return true;
  },

  async authenticate({ commit }, payload) {
    const token = payload.token;

    if (token) {
      commit(Mutations.SIGNIN, payload);
      commit(Mutations.SET_AUTHENTICATED, true);
    }
  }
};

export default actions;

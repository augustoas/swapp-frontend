import { State } from "./state.types";

const defaultState = () =>
  ({
    auth: {} as State["auth"],
    authenticated: false as State["authenticated"],
    error: {} as State["error"],
  } as State);

const state = defaultState();

export default state;

export { defaultState };

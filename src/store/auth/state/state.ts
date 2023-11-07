import { State } from "./state.types";

const defaultState = () =>
  ({
    auth: {
      user: {
        email: "",
      },
    } as State["auth"],
    authEmail: "" as State["authEmail"],
    authenticated: false as State["authenticated"],
    error: {} as State["error"],
  } as State);

const state = defaultState();

export default state;

export { defaultState };

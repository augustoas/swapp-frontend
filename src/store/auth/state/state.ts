import { State } from "./state.types";

const defaultState = () =>
  ({
    account: {} as State["account"],
    accessToken: "" as State["accessToken"],
    authenticated: false as State["authenticated"],
    errors: {} as State["errors"],
  } as State);

const state = defaultState();

export default state;

export { defaultState };
